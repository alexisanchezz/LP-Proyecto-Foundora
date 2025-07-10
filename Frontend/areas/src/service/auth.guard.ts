import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {  // "class" debe ser minúscula
  constructor(private auth: AuthService, private router: Router) {}  // Inyectado como "auth"

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {  // Usa "this.auth" en lugar de "this.authService"
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}