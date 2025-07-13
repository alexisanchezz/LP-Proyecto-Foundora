import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ObjetoEncontrado } from '../../model/ObjetoEncontrado.model';

@Component({
  selector: 'app-objetosencontrados',
  standalone: false,
  templateUrl: './objetosencontrados.component.html',
  styleUrls: ['./objetosencontrados.component.css'],
  providers: [ApiService]
})
export class ObjetosEncontradosComponent implements OnInit {
  objetos: ObjetoEncontrado[] = [];
  objetosFiltrados: ObjetoEncontrado[] = [];
  busqueda: string = '';
  tituloDialogo: string = 'Nuevo Objeto Encontrado';
  visible: boolean = false;
  objetoDialogo: ObjetoEncontrado = new ObjetoEncontrado();
  nuevoObjeto: boolean = true;
  imagenSeleccionada: File | null = null;
  splitItems = [
    {
      label: 'Objetos Perdidos',
      icon: 'pi pi-exclamation-circle',
      command: () => this.irObjetosPerdidos()
    }
  ];

  constructor(public api: ApiService, private router: Router) {}
  irObjetosPerdidos() {
    this.router.navigate(['/objetos']);
  }

  ngOnInit() {
    this.obtenerObjetosEncontrados();
  }

  obtenerObjetosEncontrados() {
    this.api.getObjetosEncontrados().subscribe((res: any[]) => {
      this.objetos = res.map(obj => ({
        ...obj,
        nombre: obj.nombre || obj.nombre_objeto
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

  editarObjeto(objeto: ObjetoEncontrado) {
    this.visible = true;
    this.nuevoObjeto = false;
    this.objetoDialogo = { ...objeto };
    this.tituloDialogo = 'Editar Objeto Encontrado';
    this.imagenSeleccionada = null;
  }

  eliminarObjeto(id: number) {
    if (confirm('¿Estás seguro de eliminar este objeto encontrado?')) {
      this.api.deleteObjetoEncontrado(id).subscribe(() => {
        this.objetos = this.objetos.filter(o => o.id !== id);
      });
    }
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoObjeto = true;
    this.objetoDialogo = new ObjetoEncontrado();
    this.tituloDialogo = 'Nuevo Objeto Encontrado';
    this.imagenSeleccionada = null;
  }

  onImagenSeleccionada(event: any) {
    const file = event.target.files && event.target.files[0];
    this.imagenSeleccionada = file ? file : null;
  }

  guardarObjeto() {
    if (this.nuevoObjeto && this.imagenSeleccionada) {
      const objetoBackend = {
        nombre_objeto: this.objetoDialogo.nombre,
        descripcion: this.objetoDialogo.descripcion,
        categoria: this.objetoDialogo.categoria,
        fecha: this.objetoDialogo.fecha,
        lugar: this.objetoDialogo.lugar,
        estado: 'encontrado', // Cambiado a 'encontrado'
        usuario: 1 // Cambia esto por el id real del usuario
      };
      this.api.postObjetoEncontradoFormDataBackend(objetoBackend, this.imagenSeleccionada).subscribe({
        next: () => {
          this.obtenerObjetosEncontrados();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al guardar objeto encontrado:', err);
          alert('Error al guardar objeto encontrado: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    } else if (this.nuevoObjeto) {
      this.api.postObjetoEncontrado(this.objetoDialogo).subscribe({
        next: () => {
          this.obtenerObjetosEncontrados();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al guardar objeto encontrado:', err);
          alert('Error al guardar objeto encontrado: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    } else {
      this.api.putObjetoEncontrado(this.objetoDialogo.id!, this.objetoDialogo).subscribe({
        next: () => {
          this.obtenerObjetosEncontrados();
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al editar objeto encontrado:', err);
          alert('Error al editar objeto encontrado: ' + (err.error?.detail || err.error?.message || err.message || 'Error desconocido'));
        }
      });
    }
  }
}