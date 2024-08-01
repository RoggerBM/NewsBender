from rest_framework import viewsets,generics
from .models import Campana, Subcampana, BBVATLMFormalizadas,BBVAWebFormalizadas,BBVAPPDesembolsos,SBPTLMAprobadas,SBPPPDesembolsos
from .serializer import CampanaSerializer,SubcampanaSerializer,BBVATLMFormalizadasSerializer,BBVAWebFormalizadasSerializer,BBVAPPDesembolsosSerializer,SBPTLMAprobadasSerializer,SBPPPDesembolsosSerializer,MetricasSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.dateparse import parse_datetime
from datetime import timedelta

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

        total_tarjetas = queryset.count()
        subcampana = Subcampana.objects.get(id=subcampana_id) if subcampana_id else None
        subcampana_data = {
            'meta': subcampana.meta if subcampana else None,
            'monto_meta': subcampana.monto_meta if subcampana else None,
        }
        
        data = {
            'total_tarjetas':total_tarjetas,
            'meta': subcampana_data["monto_meta"],
            'tipo': subcampana_data["meta"]
        }
        serializer = MetricasSerializer(data)
        return Response(serializer.data)