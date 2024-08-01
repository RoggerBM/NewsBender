from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampanaViewSet,SubcampanaViewSet,BBVATLMFormalizadasList,MetricasViewSet

router = DefaultRouter()
router.register(r'campana', CampanaViewSet)
router.register(r'subcampana', SubcampanaViewSet)
#router.register(r'bbvatlm', BBVATLMFormalizadasViewSet),


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/metricas/', MetricasViewSet.as_view(), name='metricas-view'),  # Ruta para la vista APIView
    path('api/bbvatlm/', BBVATLMFormalizadasList.as_view(), name='bbvatlmformalizadas-list'),

]
