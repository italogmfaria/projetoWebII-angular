import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importar Router
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ClientInputDTO } from '../models/user/client-input-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]  
})
export class RegisterComponent {
  newClient: ClientInputDTO = new ClientInputDTO();
  cnhStep: boolean = false;

  constructor(private authService: AuthService, private router: Router) { } 
  proceedToCnhStep(): void {
    this.cnhStep = true;
  }

  register(): void {
    this.authService.register(this.newClient).subscribe(
      response => {
        console.log('Cadastro realizado com sucesso!', response);
        this.router.navigate(['/login']);  
      },
      error => console.error('Erro ao realizar cadastro', error)
    );
  }
}
