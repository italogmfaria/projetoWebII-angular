import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserInputDTO } from '../models/user/user-input-dto';
import { LoginResponseDTO } from '../models/user/login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userIdKey = 'user_id';

  constructor(private http: HttpClient) {}

  register(client: UserInputDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, client);
  }

  login(email: string, password: string): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
        if (response.userId !== undefined && response.userId !== null) {
          this.setUserId(response.userId); // Armazenar o ID do usuário
        } else {
          console.error('userId is undefined in the login response');
        }
      })
    );
  }

  setUserId(userId: number): void {
    localStorage.setItem(this.userIdKey, userId.toString());
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }

  getUserRoleFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken['role'] ? decodedToken['role'] : decodedToken['userRole'] || null;
  }

  getUserIdFromToken(token: string): number | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken['userId'] ? decodedToken['userId'] : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey); // Remover o userId ao fazer logout
  }
}
