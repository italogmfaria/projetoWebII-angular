import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SedeInputDTO } from '../models/sede/sede-input-dto';
import { SedeOutputDTO } from '../models/sede/sede-output-dto';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';

@Injectable({
  providedIn: 'root'
})
export class SedesService {
  private apiUrl = 'http://localhost:8080/api/sede';

  constructor(private http: HttpClient) { }

  getAllSedes(): Observable<SedeOutputDTO[]> {
    return this.http.get<SedeOutputDTO[]>(this.apiUrl);
  }

  getSedeById(id: number): Observable<SedeOutputDTO> {
    return this.http.get<SedeOutputDTO>(`${this.apiUrl}/${id}`);
  }

  createSede(sede: SedeInputDTO): Observable<SedeOutputDTO> {
    return this.http.post<SedeOutputDTO>(this.apiUrl, sede);
  }

  updateSede(id: number, sede: SedeInputDTO): Observable<SedeOutputDTO> {
    return this.http.put<SedeOutputDTO>(`${this.apiUrl}/${id}`, sede);
  }

  deleteSede(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCarrosBySede(sedeId: number): Observable<CarroOutputDTO[]> {
    return this.http.get<CarroOutputDTO[]>(`${this.apiUrl}/${sedeId}/carros`);
  }
  
}
