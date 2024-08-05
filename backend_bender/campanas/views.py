from rest_framework import viewsets,generics
from .models import Campana, Subcampana, BBVATLMFormalizadas,BBVAWebFormalizadas,BBVAPPDesembolsos,SBPTLMAprobadas,SBPPPDesembolsos
from .serializer import CampanaSerializer,SubcampanaSerializer,BBVATLMFormalizadasSerializer,BBVAWebFormalizadasSerializer,BBVAPPDesembolsosSerializer,SBPTLMAprobadasSerializer,SBPPPDesembolsosSerializer,MetricasSerializer,PeriodoMetricasSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime
from datetime import timedelta,datetime
import calendar
from django.db.models import Sum,Count
from django.http import JsonResponse
from dateutil.relativedelta import relativedelta

def format_number(number):
    if abs(number) >= 1_000_000:
        return f"{number / 1_000_000:.1f}M"
    elif abs(number) >= 1_000:
        return f"{number / 1_000:.1f}k"
    else:
        return str(number)
def format_number_by_value(number):
    if isinstance(number, int):
        return f"{number:,}"
    elif isinstance(number, float):
        return f"{number:,.2f}"
    else:
        return str(number)
class CampanaViewSet(viewsets.ModelViewSet):
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer

class SubcampanaViewSet(viewsets.ModelViewSet):
    queryset = Subcampana.objects.all()
    serializer_class = SubcampanaSerializer
    def get_queryset_active(self):
        campana_id = self.request.query_params.get('campana_id', None)
        if campana_id is not None:
            return Subcampana.objects.filter(campana_id=campana_id)
        return Subcampana.objects.all()
    def get_queryset(self):
        campana_id = self.request.query_params.get('campana_id', None)
        queryset = Subcampana.objects.filter(activo=True)  # Filtra solo subcampañas activas
        if campana_id is not None:
            queryset = queryset.filter(campana_id=campana_id)
        return queryset

class BBVATLMFormalizadasList(generics.ListAPIView):
    queryset = BBVATLMFormalizadas.objects.all()
    serializer_class = BBVATLMFormalizadasSerializer
    
class BBVAWebFormalizadasViewSet(viewsets.ModelViewSet):
    queryset = BBVAWebFormalizadas.objects.all()
    serializer_class = BBVAWebFormalizadasSerializer

class BBVAPPDesembolsosViewSet(viewsets.ModelViewSet):
    queryset = BBVAPPDesembolsos.objects.all()
    serializer_class = BBVAPPDesembolsosSerializer

class SBPTLMAprobadasViewSet(viewsets.ModelViewSet):
    queryset = SBPTLMAprobadas.objects.all()
    serializer_class = SBPTLMAprobadasSerializer

class SBPPPDesembolsosViewSet(viewsets.ModelViewSet):
    queryset = SBPPPDesembolsos.objects.all()
    serializer_class = SBPPPDesembolsosSerializer
    
class MetricasViewSet(APIView):
    model_map = {
            'BBVA-TLM': BBVATLMFormalizadas,
            'BBVA-WEB': BBVAWebFormalizadas,
            'BBVA-PP': BBVAPPDesembolsos,
            'SBP-PP': SBPPPDesembolsos,
            'SBP-TLM': SBPTLMAprobadas,

        }
    def get(self,request,*args,**kwargs):
        tabla = request.query_params.get('tabla', None)
        campana_id = request.query_params.get('campana', None)
        subcampana_id = request.query_params.get('subcampana', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        if tabla not in self.model_map:
            return Response({'error': 'TABLE NOT FOUND'}, status=400)
        model = self.model_map[tabla]
        
        
        queryset = model.objects.all()
        
        if start_date:
            start_date = parse_datetime(start_date).date()  # Usar solo la fecha
            start_date = start_date - timedelta(days=1)
            print(f"Start Date Parsed: {start_date}")  # Depuración
            queryset = queryset.filter(fecha__gte=start_date)
        if end_date:
            end_date = parse_datetime(end_date).date()  # Usar solo la fecha
            print(f"End Date Parsed: {end_date}")  # Depuración
            queryset = queryset.filter(fecha__lte=end_date)
        if campana_id:
            queryset = queryset.filter(subcampaña__campana_id=campana_id)
        if subcampana_id:
            queryset = queryset.filter(subcampaña_id=subcampana_id)
        print(f"Queryset SQL: {queryset.query}")

        
        subcampana = Subcampana.objects.get(id=subcampana_id) if subcampana_id else None
        subcampana_data = {
            'meta': subcampana.meta if subcampana else None,
            'monto_meta': subcampana.monto_meta if subcampana else None,
        }
        
        if subcampana_data['meta'] == 'mount':
            total_tarjetas = queryset.aggregate(Sum('monto_desembolso'))['monto_desembolso__sum'] or 0
            titulo = "Monto Desembolsado"
        else:
            total_tarjetas = queryset.count()
            titulo = "Tarjetas Formalizadas"

        month_days = calendar.monthrange(end_date.year, end_date.month)[1]
        print("DIAS DEL MES SELECCIONADO:",month_days)
        meta_per_day = subcampana_data["monto_meta"]/month_days
        dia = end_date.day
        print("DAY SELECTED:", dia)
        meta_day = dia * round(meta_per_day)
        print("META DEL DIA",meta_day)
        val1 = total_tarjetas - meta_day
        print("VALOR 1: ",val1)
        val2 =((total_tarjetas/meta_day) -1) * 100
        val2 = round(val2,2)
        percent = (total_tarjetas/subcampana_data['monto_meta'])*100
        percent = round(percent,2)
        formatted_tarjet = format_number_by_value(total_tarjetas)
        formatted_v_day = format_number_by_value(meta_day)
        formatted_val1 = format_number(val1)
        formatted_meta = format_number_by_value(subcampana_data["monto_meta"])
        data = {
            'total_tarjetas':formatted_tarjet,
            'meta': formatted_meta,
            'tipo': subcampana_data["meta"],
            'dia': dia,
            'meta_per_day': meta_per_day,
            'meta_day' : formatted_v_day,
            'val1' : formatted_val1,
            'val2': val2,
            'percent': percent,
            'total':total_tarjetas,
            'titulo':titulo
        }
        serializer = MetricasSerializer(data)
        return Response(serializer.data)
    
class PeriodoMetricasViewSet(APIView):
    model_map = {
        'BBVA-TLM': BBVATLMFormalizadas,
        'BBVA-WEB': BBVAWebFormalizadas,
        'BBVA-PP': BBVAPPDesembolsos,
        'SBP-PP': SBPPPDesembolsos,
        'SBP-TLM': SBPTLMAprobadas,
    }

    def get(self, request, *args, **kwargs):
        tabla = request.query_params.get('tabla', None)

        subcampana_id = request.query_params.get('subcampana', None)

        if tabla not in self.model_map:
            return Response({'error': 'TABLE NOT FOUND'}, status=400)
        model = self.model_map[tabla]

        queryset = model.objects.all()

        if subcampana_id:
            queryset = queryset.filter(subcampaña_id=subcampana_id)

        subcampana = Subcampana.objects.get(id=subcampana_id) if subcampana_id else None
        subcampana_data = {
            'meta': subcampana.meta if subcampana else None,
            'monto_meta': subcampana.monto_meta if subcampana else None,
        }

        if subcampana_data['meta'] == 'mount':
            grouped_data = queryset.values('periodo').annotate(
                total_tarjetas=Sum('monto_desembolso')
            ).order_by('periodo')
        else:
            grouped_data = queryset.values('periodo').annotate(
                total_tarjetas=Count('id')
            ).order_by('periodo')

        results = []
        for data in grouped_data:
            periodo = data['periodo']
            total_tarjetas = round(data['total_tarjetas'] or 0, 2)
            results.append({
                'periodo': periodo,
                'total_tarjetas': total_tarjetas
            })

        serializer = PeriodoMetricasSerializer(results, many=True)
        return Response(serializer.data)
    
class PeriodsViewSet(APIView):
    model_map = {
        'BBVA-TLM': BBVATLMFormalizadas,
        'BBVA-WEB': BBVAWebFormalizadas,
        'BBVA-PP': BBVAPPDesembolsos,
        'SBP-PP': SBPPPDesembolsos,
        'SBP-TLM': SBPTLMAprobadas,
    }

    def get(self, request, *args, **kwargs):
        tabla = request.query_params.get('tabla', None)
        if tabla not in self.model_map:
            return Response({'error': 'TABLE NOT FOUND'}, status=400)

        model = self.model_map[tabla]
        periodos = model.objects.values_list('periodo', flat=True).distinct().order_by('-periodo')
        return Response(periodos)

class DailyMetricsByPeriodViewSet(APIView):
    model_map = {
        'BBVA-TLM': BBVATLMFormalizadas,
        'BBVA-WEB': BBVAWebFormalizadas,
        'BBVA-PP': BBVAPPDesembolsos,
        'SBP-PP': SBPPPDesembolsos,
        'SBP-TLM': SBPTLMAprobadas,
    }

    def get(self, request, *args, **kwargs):
        tabla = request.query_params.get('tabla', None)
        subcampana_id = request.query_params.get('subcampana_id', None)
        periodo = request.query_params.get('periodo', None)

        if tabla not in self.model_map:
            return Response({'error': 'TABLE NOT FOUND'}, status=400)

        model = self.model_map[tabla]

        queryset = model.objects.filter(periodo=periodo)
        
        subcampana = Subcampana.objects.get(id=subcampana_id) if subcampana_id else None
        subcampana_data = {
            'meta': subcampana.meta if subcampana else None,
            'monto_meta': subcampana.monto_meta if subcampana else None,
        }

        if subcampana_data['meta'] == 'mount':
            grouped_data = queryset.values('fecha').annotate(
                total_tarjetas=Sum('monto_desembolso')
            ).order_by('fecha')
        else:
            grouped_data = queryset.values('fecha').annotate(
                total_tarjetas=Count('id')
            ).order_by('fecha')

        data = [
            {
                'date': entry['fecha'],
                'total_tarjetas': round(entry['total_tarjetas'], 2) if isinstance(entry['total_tarjetas'], float) else entry['total_tarjetas']
            }
            for entry in grouped_data
        ]

        return Response(data)
    

class PruebaViewSet(APIView):
    model_map = {
        'BBVA-TLM': BBVATLMFormalizadas,
        'BBVA-WEB': BBVAWebFormalizadas,
        'BBVA-PP': BBVAPPDesembolsos,
        'SBP-PP': SBPPPDesembolsos,
        'SBP-TLM': SBPTLMAprobadas,
    }

    def get(self, request, *args, **kwargs):
        tabla = request.query_params.get('tabla', None)
        subcampana_id = request.query_params.get('subcampana_id', None)
        periodo = request.query_params.get('periodo', None)

        if tabla not in self.model_map:
            return Response({'error': 'TABLE NOT FOUND'}, status=400)

        model = self.model_map[tabla]

        # Obtener datos del periodo actual
        queryset_current = model.objects.filter(periodo=periodo)
        
        subcampana = Subcampana.objects.get(id=subcampana_id) if subcampana_id else None
        subcampana_data = {
            'meta': subcampana.meta if subcampana else None,
            'monto_meta': subcampana.monto_meta if subcampana else None,
        }

        if subcampana_data['meta'] == 'mount':
            grouped_data_current = queryset_current.values('fecha').annotate(
                total_tarjetas=Sum('monto_desembolso')
            ).order_by('fecha')
        else:
            grouped_data_current = queryset_current.values('fecha').annotate(
                total_tarjetas=Count('id')
            ).order_by('fecha')

        # Obtener datos del periodo anterior
        previous_period = (datetime.strptime(periodo, '%Y-%m') - relativedelta(months=1)).strftime('%Y-%m')
        queryset_previous = model.objects.filter(periodo=previous_period)
        
        if subcampana_data['meta'] == 'mount':
            grouped_data_previous = queryset_previous.values('fecha').annotate(
                total_tarjetas=Sum('monto_desembolso')
            ).order_by('fecha')
        else:
            grouped_data_previous = queryset_previous.values('fecha').annotate(
                total_tarjetas=Count('id')
            ).order_by('fecha')

        # Transformar datos a formato deseado
        data_current = {
            entry['fecha']: round(entry['total_tarjetas'], 2) if isinstance(entry['total_tarjetas'], float) else entry['total_tarjetas']
            for entry in grouped_data_current
        }

        data_previous = {
            entry['fecha']: round(entry['total_tarjetas'], 2) if isinstance(entry['total_tarjetas'], float) else entry['total_tarjetas']
            for entry in grouped_data_previous
        }

        # Generar todos los días entre el primer y el último día de los datos
        all_dates = sorted(set(data_current.keys()) | set(data_previous.keys()))

        # Combinar datos actuales y anteriores
        combined_data = [
            {
                'date': date,
                'tarjetas_del_mes': data_current.get(date, 0),
                'tarjetas_del_mes_anterior': data_previous.get(date, 0),
            }
            for date in all_dates
        ]

        return Response(combined_data)