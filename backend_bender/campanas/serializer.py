# api/serializers.py
from rest_framework import serializers
from .models import Campana, Subcampana, BBVATLMFormalizadas,BBVAWebFormalizadas,BBVAPPDesembolsos,SBPTLMAprobadas,SBPPPDesembolsos

class CampanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campana
        fields = '__all__'

class SubcampanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcampana
        fields = '__all__'

class BBVATLMFormalizadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBVATLMFormalizadas
        fields = '__all__'

class BBVAWebFormalizadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBVAWebFormalizadas
        fields = '__all__'

class BBVAPPDesembolsosSerializer(serializers.ModelSerializer):
    class Meta:
        model = BBVAPPDesembolsos
        fields = '__all__'

class SBPTLMAprobadasSerializer(serializers.ModelSerializer):
    class Meta:
        model = SBPTLMAprobadas
        fields = '__all__'

class SBPPPDesembolsosSerializer(serializers.ModelSerializer):
    class Meta:
        model = SBPPPDesembolsos
        fields = '__all__'