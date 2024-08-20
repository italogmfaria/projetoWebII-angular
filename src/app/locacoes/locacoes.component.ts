import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocacoesService } from '../services/locacoes.service';
import { LocacaoOutputDTO } from '../models/locacao/locacao-output-dto';
import { LocacaoInputDTO } from '../models/locacao/locacao-input-dto';
import { FinalizarLocacaoDTO } from '../models/locacao/finalizar-locacao-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserOutputDTO } from '../models/user/user-output-dto';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';

@Component({
  selector: 'app-locacoes',
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class LocacoesComponent implements OnInit {
  locacoes: LocacaoOutputDTO[] = [];
  newLocacao: LocacaoInputDTO = {
    dataInicio: new Date(),
    userId: new UserOutputDTO(),
    carroId: new CarroOutputDTO(),
    dataTerminoAgendado: new Date()
  };
  editingLocacao: LocacaoOutputDTO | null = null;
  showAddForm = false;

  constructor(private locacoesService: LocacoesService) {}

  ngOnInit(): void {
    this.loadLocacoes();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newLocacao = {
      dataInicio: new Date(),
      userId: new UserOutputDTO(),
      carroId: new CarroOutputDTO(),
      dataTerminoAgendado: new Date()
    };
  }

  cancelEdit(): void {
    this.editingLocacao = null;
  }

  addDiaryRental(): void {
    this.locacoesService.createDiaryRental(this.newLocacao).subscribe(() => {
      this.loadLocacoes();
      this.cancelAdd();
    });
  }

  addLongRental(): void {
    this.locacoesService.createLongRental(this.newLocacao).subscribe(() => {
      this.loadLocacoes();
      this.cancelAdd();
    });
  }

  editLocacao(locacao: LocacaoOutputDTO): void {
    this.editingLocacao = { ...locacao };
  }

  finalizarLocacao(): void {
    if (this.editingLocacao) {
      const finalizarLocacaoDTO: FinalizarLocacaoDTO = {
        dataFinalizacao: new Date()
      };
      this.locacoesService.finalizarLocacao(this.editingLocacao.id, finalizarLocacaoDTO).subscribe(() => {
        this.loadLocacoes();
        this.cancelEdit();
      });
    }
  }

  deleteLocacao(id: number): void {
    this.locacoesService.deleteLocacao(id).subscribe(() => {
      this.loadLocacoes();
    });
  }

  loadLocacoes(): void {
    this.locacoesService.getAllLocacoes().subscribe(
      (data) => {
        this.locacoes = data;
      },
      (error) => {
        console.error('Erro ao carregar locações', error);
      }
    );
  }
}
