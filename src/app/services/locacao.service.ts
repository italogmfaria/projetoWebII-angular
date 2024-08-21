import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';
import { LocacaoOutputDTO } from '../models/locacao/locacao-output-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {
  private apiUrl = 'http://localhost:8080/api/locacoes'; // Ajuste conforme necessário

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
}
