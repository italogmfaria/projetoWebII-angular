import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CatalogoComponent implements OnInit {
  carrosDisponiveis: CarroOutputDTO[] = [];
  searchNomeCarro: string = '';
  searchCidade: string = '';
  searchEstado: string = '';
  isClient: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private carroService: CarroService, 
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCarrosDisponiveis();
    this.checkUserRole();
  }

  getCarrosDisponiveis(): void {
    this.carroService.getCarros().subscribe(
      (carros) => this.carrosDisponiveis = carros.filter(carro => carro.disponivel),
      (error) => console.error('Erro ao buscar carros disponíveis', error)
    );
  }

  checkUserRole(): void {
    const token = this.authService.getToken();
    if (token) {
      const userRole = this.authService.getUserRoleFromToken(token);
      this.isClient = userRole === 'CLIENT';
      this.isAdmin = userRole === 'ADMIN';
    }
  }

  searchCarros(): void {
    this.carroService.getCarros().subscribe(
      (carros) => {
        this.carrosDisponiveis = carros.filter(carro => {
          return carro.disponivel &&
            (this.searchNomeCarro ? carro.nome.toLowerCase().includes(this.searchNomeCarro.toLowerCase()) : true) &&
            (this.searchCidade ? carro.sede?.endereco?.cidade.toLowerCase().includes(this.searchCidade.toLowerCase()) : true) &&
            (this.searchEstado ? carro.sede?.endereco?.estado.toLowerCase().includes(this.searchEstado.toLowerCase()) : true);
        });
      },
      (error) => console.error('Erro ao buscar carros', error)
    );
  }

  getCarroImageUrl(carro: CarroOutputDTO): string {
    const nomeArquivo = `${carro.modelo.fabricante.toLowerCase()}-${carro.nome.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    return `http://localhost:8080/api/files/downloadFile/${nomeArquivo}`;
  }

  alugarCarro(carroId: number): void {
    this.router.navigate(['/aluguel-carro', carroId]);
  }
}
