import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Objeto } from "../model/Objeto.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private ApiUrl = "http://localhost:8000/api/"; // Solo la base, para evitar doble "objetos"
  public baseUrl = "http://localhost:8000/"; // Base URL para imágenes y recursos

  constructor(private http: HttpClient) {}

  // Método para obtener headers con token y API-KEY
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c' // API Key de tu backend
    });

    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }

    return headers;
  }

  // Atajo para opciones HTTP
  private get httpOptions() {
    return {
      headers: this.getAuthHeaders()
    };
  }

  /* ==================== */
  /* AUTENTICACIÓN        */
  /* ==================== */
  
  // Registro de usuario
  registrarUsuario(usuario: any): Observable<any> {
    // Usa http directamente sin el interceptor para esta solicitud
    return this.http.post(`${this.ApiUrl}usuarios/`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c'
      })
    });
  }

  // Login (obtener token)
  login(username: string, password: string): Observable<any> {
    const url = `${this.ApiUrl}obtener-token/`;
    return this.http.post(url, { username, password }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /* ==================== */
  /* OPERACIONES CRUD     */
  /* ==================== */

  // Obtener todos los objetos
  getObjetos(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(
      `${this.ApiUrl}objetos/`,
      this.httpOptions
    );
  }

  // Crear nuevo objeto
  postObjeto(objeto: Objeto): Observable<Objeto> {
    return this.http.post<Objeto>(
      `${this.ApiUrl}objetos/`,
      objeto,
      this.httpOptions
    );
  }

  // Crear objeto con imagen y campos personalizados para el backend
  postObjetoFormDataBackend(objetoBackend: any, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre_objeto', objetoBackend.nombre_objeto);
    formData.append('descripcion', objetoBackend.descripcion);
    formData.append('categoria', objetoBackend.categoria);
    formData.append('fecha', objetoBackend.fecha);
    formData.append('lugar', objetoBackend.lugar);
    formData.append('estado', objetoBackend.estado);
    formData.append('usuario', objetoBackend.usuario.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(
      `${this.ApiUrl}objetos/`,
      formData,
      {
        headers: this.getAuthHeaders().delete('Content-Type')
      }
    );
  }

  // Actualizar objeto
  putObjeto(id: number, objeto: Objeto): Observable<Objeto> {
    return this.http.put<Objeto>(
      `${this.ApiUrl}objetos/${id}/`,
      objeto,
      this.httpOptions
    );
  }

  // Eliminar objeto
  deleteObjeto(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.ApiUrl}objetos/${id}/`,
      this.httpOptions
    );
  }

  /* ==================== */
  /* OTRAS OPERACIONES    */
  /* ==================== */

  // Obtener notificaciones
  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.ApiUrl}notificaciones/`,
      this.httpOptions
    );
  }

  // Obtener recompensas
  getRecompensas(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.ApiUrl}recompensas/`,
      this.httpOptions
    );
  }
}