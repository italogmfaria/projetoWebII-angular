import { Component, OnInit } from '@angular/core';
import { LocacaoService } from '../services/locacao.service';
import { LocacaoOutputDTO } from '../models/locacao/locacao-output-dto';
import { FinalizarLocacaoDTO } from '../models/locacao/finalizar-locacao-dto';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StatusLocacao } from '../models/locacao/status-locacao-enum';
import { StatusPagamento } from '../models/locacao/status-pagamento-enum';

@Component({
  selector: 'app-locacoes',
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LocacoesComponent implements OnInit {
  locacoes: LocacaoOutputDTO[] = [];
  kmRodados: number = 0;

  constructor(private locacaoService: LocacaoService) {}

  ngOnInit(): void {
    this.loadLocacoes();
  }

  loadLocacoes(): void {
    this.locacaoService.getAllLocacoes().subscribe(
      (data) => {
        this.locacoes = data;
      },
      (error) => {
        console.error('Erro ao carregar locações', error);
      }
    );
  }

  finalizarLocacao(locacao: LocacaoOutputDTO): void {
    const finalizarDTO: FinalizarLocacaoDTO = {
      dataFinalizacao: new Date()
    };
    this.locacaoService.finalizarLocacao(locacao.key, finalizarDTO).subscribe(
      () => {
        locacao.statusLocacao = StatusLocacao.FINALIZADA;
        locacao.statusPagamento = StatusPagamento.PAGO;
        console.log(`Locação ${locacao.key} finalizada com sucesso!`);
        this.loadLocacoes(); 
      },
      (error) => {
        console.error('Erro ao finalizar locação', error);
      }
    );
  }
}
