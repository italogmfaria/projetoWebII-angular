import { Component, OnInit } from '@angular/core';
import { HistoricoManutencaoOutputDTO } from '../models/historico/hist-manut-output';
import { HistoricoManutencaoInputDTO } from '../models/historico/hist-manut-input';
import { HistoricoManutencaoService } from '../services/histmanut.service';
import { HistoricoCarroService } from '../services/historico-carro.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoricoCarroOutputDTO } from '../models/historico/hist-carro-output';

@Component({
  selector: 'app-histcarro',
  templateUrl: './histcarro.component.html',
  styleUrls: ['./histcarro.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class HistcarroComponent implements OnInit {
  historicos: HistoricoManutencaoOutputDTO[] = [];
  historicosCarro: HistoricoCarroOutputDTO[] = [];
  newHistorico: HistoricoManutencaoInputDTO = {
    dataManutencao: new Date(),
    dataProximaManutencao: new Date(),
    relatorioManutencao: '',
    carroId: 0  
  };
  editingHistorico: HistoricoManutencaoOutputDTO | null = null;
  showAddForm = false;
  
  // Variável para armazenar o ID do carro inserido
  carroId: number | null = null;

  constructor(
    private historicoManutencaoService: HistoricoManutencaoService,
    private historicoCarroService: HistoricoCarroService
  ) {}

  ngOnInit(): void {
    this.loadHistoricos();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newHistorico = {
      dataManutencao: new Date(),
      dataProximaManutencao: new Date(),
      relatorioManutencao: '',
      carroId: 0
    };
  }

  cancelEdit(): void {
    this.editingHistorico = null;
  }

  addHistorico(): void {
    this.historicoManutencaoService.createHistorico(this.newHistorico).subscribe((createdHistorico) => {
      this.historicos.push(createdHistorico);
      this.newHistorico = {
        dataManutencao: new Date(),
        dataProximaManutencao: new Date(),
        relatorioManutencao: '',
        carroId: 0
      };
      this.showAddForm = false;
    });
  }

  editHistorico(historico: HistoricoManutencaoOutputDTO): void {
    this.editingHistorico = { ...historico };
  }

  updateHistorico(): void {
    if (this.editingHistorico) {
      const historicoInput: HistoricoManutencaoInputDTO = {
        dataManutencao: this.editingHistorico.dataManutencao,
        dataProximaManutencao: this.editingHistorico.dataProximaManutencao,
        relatorioManutencao: this.editingHistorico.relatorioManutencao,
        carroId: this.editingHistorico.carroId
      };
      this.historicoManutencaoService.updateHistorico(this.editingHistorico.id, historicoInput).subscribe(() => {
        this.loadHistoricos();
        this.editingHistorico = null;
      });
    }
  }

  deleteHistorico(id: number): void {
    this.historicoManutencaoService.deleteHistorico(id).subscribe(() => {
      this.loadHistoricos();
    });
  }

  loadHistoricos(): void {
    this.historicoManutencaoService.getAllHistoricos().subscribe(
      (data) => {
        this.historicos = data;
      },
      (error) => {
        console.error('Erro ao carregar histórico de manutenção', error);
      }
    );
  }

  loadHistoricoCarro(): void {
    if (this.carroId !== null) {
      this.historicoCarroService.getHistoricosByCarroId(this.carroId).subscribe(
        (data) => {
          this.historicosCarro = data;
        },
        (error) => {
          console.error('Erro ao carregar histórico de carro', error);
        }
      );
    }
  }
}
