import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
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
  diasPrevistos: number = 1;
  dataInicioAgendado!: Date;
  dataTerminoAgendado!: Date;

  constructor(
    private route: ActivatedRoute,
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.getCarro();
  }

  getCarro(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carroService.getCarroById(id).subscribe(
      (carro) => this.carro = carro,
      (error) => console.error('Erro ao buscar o carro', error)
    );
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
    console.log('Aluguel por diária clicado');
  }

  alugarCarroPeriodo(): void {
    console.log('Aluguel por período clicado');
  }
}
