import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';

@Injectable({
  providedIn: 'root'
})
export class AluguelCarroService {
  private baseUrl = 'http://localhost:8080/api/locacoes';

  constructor(private http: HttpClient) {}

  alugarPorDiaria(locacaoDiaria: LocacaoInputDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/diaria`, locacaoDiaria);
  }

  alugarPorPeriodo(locacaoPeriodo: LocacaoInputDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/longoPeriodo`, locacaoPeriodo);
  }
}
