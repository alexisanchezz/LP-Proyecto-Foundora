
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Objeto } from '../../model/Objeto.model';

@Component({
  selector: 'app-objetos',
  standalone: false,
  templateUrl: './objetos.component.html',
  styleUrl: './objetos.component.css',
  providers: [ApiService]
})
export class ObjetosComponent {
  objetos: Objeto[] = [];
  objetosFiltrados: Objeto[] = [];
  objetosEncontradosFiltrados: Objeto[] = [];
  busqueda: string = '';
  tituloDialogo: string = 'Nuevo Objeto';
  visible: boolean = false;
  objetoDialogo: Objeto = new Objeto();
  nuevoObjeto: boolean = true;
  imagenSeleccionada: File | null = null;
  splitItems = [
    {
      label: 'Objetos Encontrados',
      icon: 'pi pi-search',
      command: () => this.irObjetosEncontrados()
    }
  ];

  constructor(public api: ApiService, private router: Router) {}
  irObjetosEncontrados() {
    this.router.navigate(['/objetosencontrados']);
  }

  ngOnInit() {
    this.obtenerObjetos();
  }

  obtenerObjetos() {
    this.api.getObjetos().subscribe((res: any[]) => {
      this.objetos = res.map(obj => ({
        ...obj,
        nombre: obj.nombre || obj.nombre_objeto,
        imagen: obj.imagen
      }));
      this.filtrarObjetos();
    });
  }

  filtrarObjetos() {
    const term = this.busqueda.toLowerCase();
    this.objetosFiltrados = this.objetos.filter(obj =>
      obj.nombre.toLowerCase().includes(term) ||
      obj.descripcion.toLowerCase().includes(term) ||
      obj.categoria.toLowerCase().includes(term) ||
      obj.lugar.toLowerCase().includes(term)
    );
  }

  editarObjeto(objeto: Objeto) {
    this.visible = true;
    this.nuevoObjeto = false;
    this.objetoDialogo = { ...objeto };
    this.tituloDialogo = 'Editar Objeto';
    this.imagenSeleccionada = null;
  }

  eliminarObjeto(id: number) {
    if (confirm('¿Estás seguro de eliminar este objeto?')) {
      this.api.deleteObjeto(id).subscribe(() => {
        this.objetos = this.objetos.filter(o => o.id !== id);
      });
    }
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoObjeto = true;
    this.objetoDialogo = new Objeto();
    this.tituloDialogo = 'Nuevo Objeto';
    this.imagenSeleccionada = null;
  }

  onImagenSeleccionada(event: any) {
    const file = event.target.files && event.target.files[0];
    this.imagenSeleccionada = file ? file : null;
  }

  guardarObjeto() {
    if (this.nuevoObjeto && this.imagenSeleccionada) {
      // Si es nuevo y hay imagen, usar FormData y campos backend
      const objetoBackend = {
        nombre_objeto: this.objetoDialogo.nombre,
        descripcion: this.objetoDialogo.descripcion,
        categoria: this.objetoDialogo.categoria,
        fecha: this.objetoDialogo.fecha,
        lugar: this.objetoDialogo.lugar,
        estado: 'perdido', // O el valor que corresponda
        usuario: 1 // Cambia esto por el id real del usuario si lo tienes
      };
      this.api.postObjetoFormDataBackend(objetoBackend, this.imagenSeleccionada).subscribe({
        next: () => {
          this.obtenerObjetos();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al guardar objeto:', err);
          alert('Error al guardar objeto: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    } else if (this.nuevoObjeto) {
      // Nuevo sin imagen
      this.api.postObjeto(this.objetoDialogo).subscribe({
        next: () => {
          this.obtenerObjetos();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al guardar objeto:', err);
          alert('Error al guardar objeto: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    } else {
      // Edición (no se permite cambiar imagen aquí)
      this.api.putObjeto(this.objetoDialogo.id!, this.objetoDialogo).subscribe({
        next: () => {
          this.obtenerObjetos();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al editar objeto:', err);
          alert('Error al editar objeto: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    }
  }
}