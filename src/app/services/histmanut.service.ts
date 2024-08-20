import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HistoricoManutencaoOutputDTO } from '../models/historico/hist-manut-output';
import { HistoricoManutencaoInputDTO } from '../models/historico/hist-manut-input';

@Injectable({
  providedIn: 'root'
})
export class HistoricoManutencaoService {
  private apiUrl = 'http://localhost:8080/api/manutencao';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllHistoricos(): Observable<HistoricoManutencaoOutputDTO[]> {
    return this.http.get<HistoricoManutencaoOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getHistoricosByCarroId(carroId: number): Observable<HistoricoManutencaoOutputDTO[]> {
    return this.http.get<HistoricoManutencaoOutputDTO[]>(`${this.apiUrl}/carro/${carroId}`, { headers: this.getHeaders() });
  }

  createHistorico(historico: HistoricoManutencaoInputDTO): Observable<HistoricoManutencaoOutputDTO> {
    return this.http.post<HistoricoManutencaoOutputDTO>(this.apiUrl, historico, { headers: this.getHeaders() });
  }

  updateHistorico(id: number, historico: HistoricoManutencaoInputDTO): Observable<HistoricoManutencaoOutputDTO> {
    return this.http.put<HistoricoManutencaoOutputDTO>(`${this.apiUrl}/${id}`, historico, { headers: this.getHeaders() });
  }

  deleteHistorico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
