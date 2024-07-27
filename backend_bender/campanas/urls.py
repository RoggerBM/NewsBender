from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampanaViewSet,SubcampanaViewSet,BBVATLMFormalizadasViewSet

router = DefaultRouter()
router.register(r'campana', CampanaViewSet)
router.register(r'subcampana', SubcampanaViewSet)
router.register(r'bbvatlm', BBVATLMFormalizadasViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
