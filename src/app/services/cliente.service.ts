import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOutputDTO } from '../models/user/user-output-dto';
import { UserInputDTO } from '../models/user/user-input-dto';
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

  getAllClientes(): Observable<UserOutputDTO[]> {
    return this.http.get<UserOutputDTO[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getClienteById(id: number): Observable<UserOutputDTO> {
    return this.http.get<UserOutputDTO>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateCliente(id: number, cliente: UserInputDTO): Observable<UserOutputDTO> {
    return this.http.put<UserOutputDTO>(`${this.apiUrl}/${id}`, cliente, { headers: this.getHeaders() });
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}