import { Component } from '@angular/core';

@Component({
  selector: 'app-tesoro',
  standalone: false,
  templateUrl: './tesoro.component.html',
  styleUrl: './tesoro.component.css'
})
export class TesoroComponent {
  fechaEvento = '12-08-2025';
  lugar = 'Universidad de Huánuco - La Esperanza';

  jugar() {
    console.log('¡Comienza la búsqueda del tesoro!');
    // Aquí puedes redirigir o activar algo
  } 
}
