import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';
import { LocacaoOutputDTO } from '../models/locacao/locacao-output-dto';
import { AuthService } from './auth.service';
import { FinalizarLocacaoDTO } from '../models/locacao/finalizar-locacao-dto';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {
  private apiUrl = 'http://localhost:8080/api/locacoes'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createDiaryRental(locacaoInput: LocacaoInputDTO): Observable<LocacaoOutputDTO> {
    return this.http.post<LocacaoOutputDTO>(`${this.apiUrl}/diaria`, locacaoInput, { headers: this.getHeaders() });
  }

  createScheduledRental(locacaoInput: LocacaoInputDTO): Observable<LocacaoOutputDTO> {
    return this.http.post<LocacaoOutputDTO>(`${this.apiUrl}/agendada`, locacaoInput, { headers: this.getHeaders() });
  }

  getAllLocacoes(): Observable<LocacaoOutputDTO[]> {
    return this.http.get<LocacaoOutputDTO[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  finalizarLocacao(id: number, finalizarDTO: FinalizarLocacaoDTO): Observable<void> {
    const url = `${this.apiUrl}/finalizar/${id}`;
    return this.http.post<void>(url, finalizarDTO, { headers: this.getHeaders() });
  }

  getLocacaoById(id: number): Observable<LocacaoOutputDTO> {
    return this.http.get<LocacaoOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
