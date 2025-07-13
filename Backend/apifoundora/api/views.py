from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Usuario, Notificacion, Objeto, ObjetoEncontrado, Publicidad, Recompensa
from .serializers import UsuarioSerializer, NotificacionSerializer, ObjetoSerializer, ObjetoEncontradoSerializer, PublicidadSerializer, RecompensaSerializer
from django.contrib.auth.hashers import make_password

# Vista para /api/usuarios/me/
class UsuarioMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data) 

# Vista para el registro y gestión de usuarios
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

# Vista para notificaciones
class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer

# Vista para objetos
class ObjetoViewSet(viewsets.ModelViewSet):
    queryset = Objeto.objects.all()
    serializer_class = ObjetoSerializer
    
# Vista para objetos encontrados
class ObjetoEncontradoViewSet(viewsets.ModelViewSet):
    queryset = ObjetoEncontrado.objects.all()
    serializer_class = ObjetoEncontradoSerializer

# Vista para publicidad
class PublicidadViewSet(viewsets.ModelViewSet):
    queryset = Publicidad.objects.all()
    serializer_class = PublicidadSerializer

# Vista para recompensas
class RecompensaViewSet(viewsets.ModelViewSet):
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer

# Vista para obtener token de autenticación
class ObtenerToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)  # Esto lanza el error 400 si los datos son inválidos
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })