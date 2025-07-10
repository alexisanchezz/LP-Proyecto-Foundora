import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (this.loading) return;
    
    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: (response) => {
          this.loading = false;
          
          // Guardar token en localStorage
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          
          // Mostrar mensaje de éxito
          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenido',
            detail: 'Inicio de sesión exitoso'
          });
          
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          this.loading = false;
          
          // Manejar diferentes tipos de errores
          if (err.status === 401) {
            this.error = 'Credenciales incorrectas';
          } else if (err.status === 0) {
            this.error = 'No se puede conectar al servidor';
          } else {
            this.error = err.error?.message || 'Error al iniciar sesión';
          }
          
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.error
          });
        }
      });
  }
} 