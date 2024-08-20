import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOutputDTO } from '../models/user/user-output-dto';
import { UserInputDTO } from '../models/user/user-input-dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUserProfile(): Observable<UserOutputDTO> {
    const userId = this.authService.getUserId();
    if (userId) {
      return this.http.get<UserOutputDTO>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
    } else {
      throw new Error('User ID not found');
    }
  }

  updateUserProfile(userId: number, user: UserInputDTO): Observable<UserOutputDTO> {
    return this.http.put<UserOutputDTO>(`${this.apiUrl}/${userId}`, user, { headers: this.getHeaders() });
  }
}
