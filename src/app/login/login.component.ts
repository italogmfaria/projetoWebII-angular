import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginResponseDTO } from '../models/user/login-response-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (response: LoginResponseDTO) => {
        console.log('Login realizado com sucesso!', response);
        this.authService.setToken(response.token);

        const userRole = this.authService.getUserRoleFromToken(response.token);

        if (userRole === 'ADMIN') {
          this.router.navigate(['/painel']);
        } else {
          this.router.navigate(['/catalogo']);
        }
      },
      error => {
        console.error('Erro ao realizar login', error);
      }
    );
  }
}
