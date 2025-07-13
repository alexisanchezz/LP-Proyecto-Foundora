import { Component } from '@angular/core';

@Component({
  selector: 'app-recompensas',
  standalone: false,
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css']
})
export class RecompensasComponent {
  // Datos estáticos para mostrar
  recompensas = [
    { nombre: 'Ver un Capítulo de una Serie', canjeada: false },
    { nombre: 'Beber un Refresco', canjeada: false },
    { nombre: 'Jugar 1 hora', canjeada: false },
    { nombre: 'Comer algo Dulce', canjeada: false }, // Ejemplo de recompensa canjeada
    { nombre: 'Comer Fuera', canjeada: false },
    { nombre: 'Ver una Película', canjeada: false }
  ];
}