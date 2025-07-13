import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Objeto } from "../model/Objeto.model";
import { ObjetoEncontrado } from '../model/ObjetoEncontrado.model';
import { Recompensa } from '../model/Recompensa.model';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private ApiUrl = "http://localhost:8000/api/";  
  public baseUrl = "http://localhost:8000/";  

  constructor(private http: HttpClient) {}

  // Método para obtener headers con token y API-KEY
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c'
    });

    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }

    return headers;
  } 

  // Obtener usuario actual (debe existir en el backend)
  getUsuarioActual() {
    const token = localStorage.getItem('token'); // O como guardes el token
    return this.http.get('/api/usuarios/me/', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
  }

  // Atajo para opciones HTTP
  private get httpOptions() {
    return {
      headers: this.getAuthHeaders()
    };
  }

  /* ==================== */
  /* AUTENTICACIÓN (SIN CAMBIOS) */
  /* ==================== */

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}usuarios/`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': 'eCNCVrBt7rw5eS6i2XtR9c'
      })
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.ApiUrl}obtener-token/`, { username, password }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /* ==================== */
  /* OPERACIONES CRUD OBJETOS (SIN CAMBIOS) */
  /* ==================== */

  getObjetos(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(`${this.ApiUrl}objetos/`, this.httpOptions);
  }

  postObjeto(objeto: Objeto): Observable<Objeto> {
    return this.http.post<Objeto>(`${this.ApiUrl}objetos/`, objeto, this.httpOptions);
  }

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
    return this.http.post(`${this.ApiUrl}objetos/`, formData, {
      headers: this.getAuthHeaders().delete('Content-Type')
    });
  }

  putObjeto(id: number, objeto: Objeto): Observable<Objeto> {
    return this.http.put<Objeto>(`${this.ApiUrl}objetos/${id}/`, objeto, this.httpOptions);
  }

  deleteObjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}objetos/${id}/`, this.httpOptions);
  }

  /* ==================== */
  /* OPERACIONES OBJETOS ENCONTRADOS (MODIFICACIONES) */
  /* ==================== */

  getObjetosEncontrados(): Observable<ObjetoEncontrado[]> {
    return this.http.get<ObjetoEncontrado[]>(`${this.ApiUrl}objetos-encontrados/`, this.httpOptions);
  }

  postObjetoEncontrado(objeto: ObjetoEncontrado): Observable<ObjetoEncontrado> {
    return this.http.post<ObjetoEncontrado>(
      `${this.ApiUrl}objetos-encontrados/`, 
      objeto, 
      this.httpOptions
    );
  }

  postObjetoEncontradoFormDataBackend(objetoBackend: any, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre_objeto', objetoBackend.nombre_objeto);
    formData.append('descripcion', objetoBackend.descripcion);
    formData.append('categoria', objetoBackend.categoria);
    formData.append('fecha', objetoBackend.fecha);
    formData.append('lugar', objetoBackend.lugar);
    formData.append('estado', 'encontrado'); // Estado fijo
    formData.append('usuario', objetoBackend.usuario.toString());
  
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post(
      `${this.ApiUrl}objetos-encontrados/`, 
      formData, 
      { headers: this.getAuthHeaders().delete('Content-Type') }
    );
  }

  putObjetoEncontrado(id: number, objeto: ObjetoEncontrado): Observable<ObjetoEncontrado> {
    return this.http.put<ObjetoEncontrado>(
      `${this.ApiUrl}objetos-encontrados/${id}/`, 
      objeto, 
      this.httpOptions
    );
  }

  deleteObjetoEncontrado(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.ApiUrl}objetos-encontrados/${id}/`, 
      this.httpOptions
    );
  } 

  /* ==================== */
  /* NOTIFICACIONES Y RECOMPENSAS (SIN CAMBIOS) */
  /* ==================== */

  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}notificaciones/`, this.httpOptions);
  }

  getRecompensas(): Observable<Recompensa[]> {
    return this.http.get<Recompensa[]>(`${this.ApiUrl}/recompensas`);
  }
}