import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { CarroInputDTO } from '../models/carro/carro-input-dto';
import { Cor } from '../models/carro/cor-enum';
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
  novoCarro: CarroInputDTO = new CarroInputDTO();
  carroSelecionado: CarroOutputDTO | null = null;
  mostrarFormularioAdicionar = false; 
  mostrarFormularioEditar = false; 

  constructor(private carroService: CarroService) { }

  ngOnInit(): void {
    this.getCarros();
  }

  getCarros(): void {
    this.carroService.getCarros().subscribe(
      (carros) => this.carros = carros,
      (error) => console.error('Erro ao buscar carros', error)
    );
  }

  toggleFormularioAdicionar(): void {
    this.mostrarFormularioAdicionar = !this.mostrarFormularioAdicionar;
    if (!this.mostrarFormularioAdicionar) {
      this.novoCarro = new CarroInputDTO();
    }
  }

  createCarro(): void {
    this.carroService.createCarro(this.novoCarro).subscribe(() => {
      this.getCarros();
      this.novoCarro = new CarroInputDTO();
      this.mostrarFormularioAdicionar = false;
    });
  }

  updateCarro(): void {
    if (this.carroSelecionado) {
      const carroAtualizado: CarroInputDTO = {
        nome: this.carroSelecionado.nome,
        cor: this.carroSelecionado.cor,
        disponivel: this.carroSelecionado.disponivel,
        kmRodados: this.carroSelecionado.kmRodados,
        valorDiariaAtual: this.carroSelecionado.valorDiariaAtual,
        modeloId: this.carroSelecionado.modeloId,
        sedeId: this.carroSelecionado.sedeId
      };
      this.carroService.updateCarro(this.carroSelecionado.id, carroAtualizado).subscribe(() => {
        this.getCarros();
        this.carroSelecionado = null;
        this.mostrarFormularioEditar = false; 
      });
    }
  }

  selectCarro(carro: CarroOutputDTO): void {
    this.carroSelecionado = { ...carro };
    this.mostrarFormularioEditar = true;
    this.mostrarFormularioAdicionar = false; 
  }

  deleteCarro(id: number): void {
    this.carroService.deleteCarro(id).subscribe(() => this.getCarros());
  }

  clearSelection(): void {
    this.carroSelecionado = null;
    this.mostrarFormularioEditar = false;
  }
}
