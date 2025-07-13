from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Usuario, Notificacion, Objeto, ObjetoEncontrado,Publicidad, Recompensa

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
    imagen = serializers.ImageField(use_url=True)

    class Meta:
        model = Objeto
        fields = '__all__'

class ObjetoEncontradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetoEncontrado
        fields = '__all__'
        extra_kwargs = {
            'estado': {'read_only': True},  # Auto-asignado por el backend
            'usuario': {'read_only': True}  # Auto-asignado por el backend
        }

    def create(self, validated_data):
        """Auto-asigna usuario y estado al crear"""
        validated_data['usuario'] = self.context['request'].user
        validated_data['estado'] = 'encontrado'
        return super().create(validated_data)

class PublicidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicidad  # Corregido: sin "models." y nombre exacto
        fields = '__all__'

class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa  # Corregido: sin "models." y nombre exacto
        fields = '__all__'