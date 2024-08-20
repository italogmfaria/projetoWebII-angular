import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { CarroInputDTO } from '../models/carro/carro-input-dto';
import { Cor } from '../models/carro/cor-enum';
import { ModeloInputDTO } from '../models/modelo/modelo-input-dto';
import { SedeInputDTO } from '../models/sede/sede-input-dto';
import { DocumentoInputDTO } from '../models/documento/documento-input-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class CarrosComponent implements OnInit {
  carros: CarroOutputDTO[] = [];
  corOptions = Object.values(Cor);

  newCarro: CarroInputDTO = {
    nome: '',
    cor: Cor.BRANCO,
    kmRodados: 0,
    valorDiariaAtual: 0,
    disponivel: true,
    modelo: new ModeloInputDTO(),
    sede: new SedeInputDTO(),
    documento: new DocumentoInputDTO()
  };
  
  editingCarro: CarroOutputDTO | null = null;
  showAddForm = false;
  showDetailsForm = false;

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.loadCarros();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newCarro = {
      nome: '',
      cor: Cor.BRANCO,
      kmRodados: 0,
      valorDiariaAtual: 0,
      disponivel: true,
      modelo: new ModeloInputDTO(),
      sede: new SedeInputDTO(),
      documento: new DocumentoInputDTO()
    };
  }

  cancelEdit(): void {
    this.editingCarro = null;
  }

  addCarro(): void {
    this.carroService.createCarro(this.newCarro).subscribe(() => {
      this.loadCarros();
      this.cancelAdd();
    });
  }

  editCarro(carro: CarroOutputDTO): void {
    this.editingCarro = { ...carro };
    this.showDetailsForm = true;
  }

  updateCarro(): void {
    if (this.editingCarro) {
      const carroInput: CarroInputDTO = {
        nome: this.editingCarro.nome,
        cor: this.editingCarro.cor,
        kmRodados: this.editingCarro.kmRodados,
        valorDiariaAtual: this.editingCarro.valorDiariaAtual,
        disponivel: this.editingCarro.disponivel,
        modelo: this.editingCarro.modelo,
        sede: this.editingCarro.sede,
        documento: this.editingCarro.documento
      };
      this.carroService.updateCarro(this.editingCarro.id, carroInput).subscribe(() => {
        this.loadCarros();
        this.cancelEdit();
      });
    }
  }

  deleteCarro(id: number): void {
    this.carroService.deleteCarro(id).subscribe(() => {
      this.loadCarros();
    });
  }

  loadCarros(): void {
    this.carroService.getCarros().subscribe(
      (data) => {
        this.carros = data;
      },
      (error) => {
        console.error('Erro ao carregar carros', error);
      }
    );
  }

  viewDetails(carro: CarroOutputDTO): void {
    this.editCarro(carro);
  }

  closeDetailsForm(): void {
    this.showDetailsForm = false;
    this.cancelEdit();
  }
}
