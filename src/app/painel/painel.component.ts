import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class PainelComponent {


  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

}
