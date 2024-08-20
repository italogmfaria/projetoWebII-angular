import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';
import { LocacaoOutputDTO } from '../models/locacao/locacao-output-dto';
import { FinalizarLocacaoDTO } from '../models/locacao/finalizar-locacao-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocacoesService {
  private apiUrl = 'http://localhost:8080/api/locacoes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllLocacoes(): Observable<LocacaoOutputDTO[]> {
    return this.http.get<LocacaoOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getLocacaoById(id: number): Observable<LocacaoOutputDTO> {
    return this.http.get<LocacaoOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createDiaryRental(locacao: LocacaoInputDTO): Observable<LocacaoOutputDTO> {
    return this.http.post<LocacaoOutputDTO>(`${this.apiUrl}/diaria`, locacao, { headers: this.getHeaders() });
  }

  createLongRental(locacao: LocacaoInputDTO): Observable<LocacaoOutputDTO> {
    return this.http.post<LocacaoOutputDTO>(`${this.apiUrl}/longoPeriodo`, locacao, { headers: this.getHeaders() });
  }

  finalizarLocacao(id: number, finalizarLocacaoDTO: FinalizarLocacaoDTO): Observable<LocacaoOutputDTO> {
    return this.http.put<LocacaoOutputDTO>(`${this.apiUrl}/${id}/finalizar`, finalizarLocacaoDTO, { headers: this.getHeaders() });
  }

  deleteLocacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
