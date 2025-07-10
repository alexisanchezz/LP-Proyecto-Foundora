from django.contrib import admin
from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'notificaciones', views.NotificacionViewSet)
router.register(r'objetos', views.ObjetoViewSet)
router.register(r'publicidades', views.PublicidadViewSet)
router.register(r'recompensas', views.RecompensaViewSet) 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]   