import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService]
})
export class RegistroComponent {
  registro = {
    nombre: '',
    email: '',
    password: '',
    terminos: false
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  registrar() {
    if (!this.registro.terminos) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atención',
        detail: 'Debes aceptar los términos y condiciones'
      });
      return;
    }

    this.apiService.registrarUsuario({
      username: this.registro.nombre,
      email: this.registro.email,
      password: this.registro.password
    }).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Tu cuenta ha sido creada correctamente'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        console.log('Detalle del error:', err.error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Error al registrar el usuario'
        });
      }
    });
  }
}