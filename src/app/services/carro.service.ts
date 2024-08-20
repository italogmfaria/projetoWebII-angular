import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { CarroInputDTO } from '../models/carro/carro-input-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private apiUrl = 'http://localhost:8080/api/carro';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getCarros(): Observable<CarroOutputDTO[]> {
    return this.http.get<CarroOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCarroById(id: number): Observable<CarroOutputDTO> {
    return this.http.get<CarroOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCarro(carro: CarroInputDTO): Observable<CarroOutputDTO> {
    return this.http.post<CarroOutputDTO>(this.apiUrl, carro, { headers: this.getHeaders() });
  }

  updateCarro(id: number, carro: CarroInputDTO): Observable<CarroOutputDTO> {
    return this.http.put<CarroOutputDTO>(`${this.apiUrl}/${id}`, carro, { headers: this.getHeaders() });
  }

  deleteCarro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
