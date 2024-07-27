from rest_framework import viewsets,generics
from .models import Campana, Subcampana, BBVATLMFormalizadas,BBVAWebFormalizadas,BBVAPPDesembolsos,SBPTLMAprobadas,SBPPPDesembolsos
from .serializer import CampanaSerializer,SubcampanaSerializer,BBVATLMFormalizadasSerializer,BBVAWebFormalizadasSerializer,BBVAPPDesembolsosSerializer,SBPTLMAprobadasSerializer,SBPPPDesembolsosSerializer


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
class BBVATLMFormalizadasViewSet(viewsets.ModelViewSet):
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