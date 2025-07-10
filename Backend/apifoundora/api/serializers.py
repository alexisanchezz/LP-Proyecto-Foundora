from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Usuario, Notificacion, Objeto, Publicidad, Recompensa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }

    def validate(self, data):
        if Usuario.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("El nombre de usuario ya existe")
        if Usuario.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("El email ya está registrado")
        return data

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=True
        )
        return user

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion  # Corregido: sin "models." y nombre exacto
        fields = '__all__'

class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto  # Corregido: sin "models." y nombre exacto
        fields = '__all__'

class PublicidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicidad  # Corregido: sin "models." y nombre exacto
        fields = '__all__'

class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa  # Corregido: sin "models." y nombre exacto
        fields = '__all__'