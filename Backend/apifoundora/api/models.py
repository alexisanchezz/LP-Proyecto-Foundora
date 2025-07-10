# Añade esto al inicio del archivo
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UsuarioManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('El correo electrónico es obligatorio'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superusuario debe tener is_staff=True'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superusuario debe tener is_superuser=True'))
        
        return self.create_user(username, email, password, **extra_fields)

class Usuario(AbstractUser):
    # Campos personalizados
    puntos = models.IntegerField(default=0)
    nivel = models.IntegerField(default=1)
    
    # Campos requeridos
    is_active = models.BooleanField(default=True)
    
    # Especificar campos requeridos para createsuperuser
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.username
     
#Clase Notificación 
class Notificacion(models.Model):
    mensaje = models.TextField()
    leido = models.BooleanField(default=False)
    fecha = models.DateField(auto_now_add=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')

    def __str__(self):
        return f"Notificación para {self.usuario.nombre}" #Notificar para el Usuario.

#Clase Objeto
class Objeto(models.Model):
    nombre_objeto = models.CharField(max_length=100)
    descripcion = models.TextField() 
    categoria = models.CharField(max_length=50)
    fecha = models.DateField()
    lugar = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='objetos/') #Mostrar la Imagen insertada (.jpg). 
    estado = models.CharField(max_length=50)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='objetos')

    def __str__(self):
        return self.nombre_objeto

#Clase Publicidad
class Publicidad(models.Model):
    nombre_empresa = models.CharField(max_length=100)
    contenido = models.TextField()
    url = models.URLField() #Enlaca el URL de un patrocinador.  
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    def __str__(self):
        return self.nombre_empresa

#Clase Recompensa
class Recompensa(models.Model):
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    fecha = models.DateField(auto_now_add=True) #Agrega fecha actual.
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='recompensas')
    objeto = models.ForeignKey(Objeto, on_delete=models.CASCADE, related_name='recompensas')

    def __str__(self):
        return f"{self.monto} para {self.usuario.nombre}" #Monto de recompensa para el Usuario.

