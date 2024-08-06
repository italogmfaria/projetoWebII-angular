import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarroInputDTO } from '../models/carro-input-dto';
import { CarroOutputDTO } from '../models/carro-output-dto';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private baseUrl = 'http://localhost:8080/api/carro';

  constructor(private http: HttpClient) { }

  createCarro(carro: CarroInputDTO): Observable<CarroOutputDTO> {
    return this.http.post<CarroOutputDTO>(`${this.baseUrl}`, carro);
  }

  getCarros(): Observable<CarroOutputDTO[]> {
    return this.http.get<CarroOutputDTO[]>(`${this.baseUrl}`);
  }

  getCarroById(id: number): Observable<CarroOutputDTO> {
    return this.http.get<CarroOutputDTO>(`${this.baseUrl}/${id}`);
  }

  updateCarro(id: number, carro: CarroInputDTO): Observable<CarroOutputDTO> {
    return this.http.put<CarroOutputDTO>(`${this.baseUrl}/${id}`, carro);
  }

  deleteCarro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
