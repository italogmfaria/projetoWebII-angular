import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SedeInputDTO } from '../models/sede/sede-input-dto';
import { SedeOutputDTO } from '../models/sede/sede-output-dto';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { AuthService } from './auth.service'; // Assumindo que há um serviço de autenticação

@Injectable({
  providedIn: 'root'
})
export class SedesService {
  private apiUrl = 'http://localhost:8080/api/sede';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllSedes(): Observable<SedeOutputDTO[]> {
    return this.http.get<SedeOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getSedeById(id: number): Observable<SedeOutputDTO> {
    return this.http.get<SedeOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createSede(sede: SedeInputDTO): Observable<SedeOutputDTO> {
    return this.http.post<SedeOutputDTO>(this.apiUrl, sede, { headers: this.getHeaders() });
  }

  updateSede(id: number, sede: SedeInputDTO): Observable<SedeOutputDTO> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this.http.put<SedeOutputDTO>(`${this.apiUrl}/${id}`, sede, { headers });
}

  deleteSede(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getCarrosBySede(sedeId: number): Observable<CarroOutputDTO[]> {
    return this.http.get<CarroOutputDTO[]>(`${this.apiUrl}/${sedeId}/carros`, { headers: this.getHeaders() });
  }
}