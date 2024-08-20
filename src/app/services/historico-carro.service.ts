import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HistoricoCarroOutputDTO } from '../models/historico/hist-carro-output';

@Injectable({
  providedIn: 'root'
})
export class HistoricoCarroService {
  private apiUrl = 'http://localhost:8080/api/carro'; // ajuste essa URL conforme necessário

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getHistoricosByCarroId(carroId: number): Observable<HistoricoCarroOutputDTO[]> {
    return this.http.get<HistoricoCarroOutputDTO[]>(`${this.apiUrl}/${carroId}/historico`, { headers: this.getHeaders() });
  }
}
