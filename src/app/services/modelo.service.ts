import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloOutputDTO } from '../models/modelo/modelo-output-dto';
import { ModeloInputDTO } from '../models/modelo/modelo-input-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  private apiUrl = 'http://localhost:8080/api/modelo';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllModelos(): Observable<ModeloOutputDTO[]> {
    return this.http.get<ModeloOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getModeloById(id: number): Observable<ModeloOutputDTO> {
    return this.http.get<ModeloOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createModelo(modelo: ModeloInputDTO): Observable<ModeloOutputDTO> {
    return this.http.post<ModeloOutputDTO>(this.apiUrl, modelo, { headers: this.getHeaders() });
  }

  updateModelo(id: number, modelo: ModeloInputDTO): Observable<ModeloOutputDTO> {
    return this.http.put<ModeloOutputDTO>(`${this.apiUrl}/${id}`, modelo, { headers: this.getHeaders() });
  }

  deleteModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
