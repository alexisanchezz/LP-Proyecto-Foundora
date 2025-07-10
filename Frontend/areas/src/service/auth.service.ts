import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Asegúrate que el puerto sea correcto (8000 normalmente)
  private loginUrl = `${this.apiUrl}obtener-token/`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, {
      username: username.trim(), // Corregí "trian()" a "trim()"
      password: password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c' // Corregí "X-API-KEV" y la clave
      })
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Corregí "localhostStorage"
  }

  logout() {
    localStorage.removeItem('token');
  }
}