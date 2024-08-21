import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { LocacaoService } from '../services/locacao.service';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aluguel-carro',
  templateUrl: './aluguel-carro.component.html',
  styleUrls: ['./aluguel-carro.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AluguelCarroComponent implements OnInit {
  carro!: CarroOutputDTO;
  isDiaria: boolean = false;
  isPeriodo: boolean = false;
  dataInicio!: Date;
  dataTerminoAgendado!: Date;
  isClient: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private carroService: CarroService,
    private locacaoService: LocacaoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCarro();
    this.checkUserRole();
  }

  getCarro(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carroService.getCarroById(id).subscribe(
      (carro) => this.carro = carro,
      (error) => console.error('Erro ao buscar o carro', error)
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCarroImageUrl(carro: CarroOutputDTO): string {
    const nomeArquivo = `${carro.modelo.fabricante.toLowerCase()}-${carro.nome.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    return `http://localhost:8080/api/files/downloadFile/${nomeArquivo}`;
  }

  showDiariaForm(): void {
    this.isDiaria = true;
    this.isPeriodo = false;
  }

  showPeriodoForm(): void {
    this.isDiaria = false;
    this.isPeriodo = true;
  }

  alugarCarroDiaria(): void {
    const userId = this.authService.getUserId(); // Pega diretamente do localStorage e garante que seja do tipo `string`
    if (!userId) {
      console.error('Erro: ID do usuário não encontrado.');
      return;
    }

    const locacaoInput: LocacaoInputDTO = {
      dataInicio: new Date(),
      userId: Number(userId), 
      carroId: this.carro.id 
    };

    this.locacaoService.createDiaryRental(locacaoInput).subscribe(
      (locacao) => {
        alert('Aluguel por diária realizado com sucesso!');
        this.router.navigate(['/catalogo']); // Redireciona para o perfil do usuário
      },
      (error) => console.error('Erro ao realizar aluguel por diária', error)
    );
  }

  alugarCarroPeriodo(): void {
    const userId = this.authService.getUserId(); // Pega diretamente do localStorage e garante que seja do tipo `string`
    if (!userId) {
      console.error('Erro: ID do usuário não encontrado.');
      return;
    }

    const locacaoInput: LocacaoInputDTO = {
      dataInicio: new Date(),
      userId: Number(userId), // Converte para número, garantindo que seja enviado corretamente
      carroId: this.carro.id, // Esse já é um número
      dataTerminoAgendado: this.dataTerminoAgendado
    };

    this.locacaoService.createScheduledRental(locacaoInput).subscribe(
      (locacao) => {
        alert('Aluguel por período agendado realizado com sucesso!');
        this.router.navigate(['/catalogo']); // Redireciona para o perfil do usuário
      },
      (error) => console.error('Erro ao realizar aluguel por período agendado', error)
    );
  }
}
