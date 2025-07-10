import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Excluye las rutas que no necesitan token (login y registro)
    if (req.url.includes('/api/obtener-token/') || req.url.includes('/api/usuarios/')) {
      return next.handle(req); // Pasa la solicitud sin modificar
    }

    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c'
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}