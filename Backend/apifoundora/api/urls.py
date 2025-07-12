from rest_framework import routers
from . import views
from django.urls import path,include 
from .views import ObtenerToken, ObjetoEncontradoViewSet

router = routers.DefaultRouter()

router.register('usuarios', views.UsuarioViewSet)
router.register('notificaciones', views.NotificacionViewSet)
router.register('objetos', views.ObjetoViewSet)
router.register('objetos-encontrados', views.ObjetoEncontradoViewSet)
router.register('publicidades', views.PublicidadViewSet)
router.register('recompensas', views.RecompensaViewSet) 


urlpatterns = [
    path('',include(router.urls)), 
    path('obtener-token/', ObtenerToken.as_view(), name='obtener-token'),
] 