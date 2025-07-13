import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Usuario } from '../../model/Usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  providers: [ApiService]
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    // Suponiendo que el backend tiene un endpoint /api/usuarios/me/ que devuelve el usuario actual
    this.api.getUsuarioActual().subscribe({
      next: (res: any) => {
        console.log('Respuesta usuario:', res);
        // Si la respuesta tiene los datos en otro objeto, ajusta aquí
        this.usuario = {
          username: res.username || res.nombre || '',
          email: res.email || '',
          puntos: res.puntos,
          nivel: res.nivel
        };
      },
      error: (err: any) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }
}
