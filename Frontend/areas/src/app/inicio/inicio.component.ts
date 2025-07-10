import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  articulo: string = '';
  lugar: string = '';
  descripcion: string = '';

  entregarArticulo(): void {
    console.log('Artículo perdido:', this.articulo);
    console.log('Lugar:', this.lugar);
    console.log('Descripción:', this.descripcion);
    // Aquí podrías hacer una petición HTTP para guardar el reporte de objeto perdido
    alert('Artículo perdido enviado con éxito.');
  }

  enviarEncontrado(): void {
    console.log('Artículo encontrado:', this.articulo);
    console.log('Lugar:', this.lugar);
    console.log('Descripción:', this.descripcion);
    // Aquí podrías hacer una petición HTTP para registrar objeto encontrado
    alert('Artículo encontrado enviado con éxito.');
  }
}
