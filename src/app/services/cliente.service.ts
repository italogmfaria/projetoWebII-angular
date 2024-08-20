import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientOutputDTO } from '../models/user/client-output-dto';
import { ClientInputDTO } from '../models/user/client-input-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllClientes(): Observable<ClientOutputDTO[]> {
    return this.http.get<ClientOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getClienteById(id: number): Observable<ClientOutputDTO> {
    return this.http.get<ClientOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateCliente(id: number, cliente: ClientInputDTO): Observable<ClientOutputDTO> {
    return this.http.put<ClientOutputDTO>(`${this.apiUrl}/${id}`, cliente, { headers: this.getHeaders() });
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}