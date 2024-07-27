from django.contrib import admin
from .models import Campana, Subcampana, BBVATLMFormalizadas,BBVAWebFormalizadas,BBVAPPDesembolsos,SBPTLMAprobadas,SBPPPDesembolsos
# Register your models here.
admin.site.register(Campana)
admin.site.register(Subcampana)
admin.site.register(BBVATLMFormalizadas)
admin.site.register(BBVAWebFormalizadas)
admin.site.register(BBVAPPDesembolsos)
admin.site.register(SBPTLMAprobadas)
admin.site.register(SBPPPDesembolsos)