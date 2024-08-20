import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelosService } from '../services/modelo.service';
import { ModeloOutputDTO } from '../models/modelo/modelo-output-dto';
import { ModeloInputDTO } from '../models/modelo/modelo-input-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class ModelosComponent implements OnInit {
  modelos: ModeloOutputDTO[] = [];
  newModelo: ModeloInputDTO = {
    fabricante: '',
    anoFabricacao: '',
    categoria: ''
  };
  editingModelo: ModeloOutputDTO | null = null;
  showAddForm = false;

  constructor(private modelosService: ModelosService) {}

  ngOnInit(): void {
    this.loadModelos();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newModelo = {
      fabricante: '',
      anoFabricacao: '',
      categoria: ''
    };
  }

  cancelEdit(): void {
    this.editingModelo = null;
  }

  addModelo(): void {
    this.modelosService.createModelo(this.newModelo).subscribe(() => {
      this.loadModelos();
      this.newModelo = {
        fabricante: '',
        anoFabricacao: '',
        categoria: ''
      };
      this.showAddForm = false; 
    });
  }

  editModelo(modelo: ModeloOutputDTO): void {
    this.editingModelo = { ...modelo };
  }

  updateModelo(): void {
    if (this.editingModelo) {
      const modeloInput: ModeloInputDTO = {
        fabricante: this.editingModelo.fabricante,
        anoFabricacao: this.editingModelo.anoFabricacao,
        categoria: this.editingModelo.categoria
      };
      this.modelosService.updateModelo(this.editingModelo.id, modeloInput).subscribe(() => {
        this.loadModelos();
        this.editingModelo = null;
      });
    }
  }

  deleteModelo(id: number): void {
    this.modelosService.deleteModelo(id).subscribe(() => {
      this.loadModelos();
    });
  }

  loadModelos(): void {
    this.modelosService.getAllModelos().subscribe(
      (data) => {
        this.modelos = data;
      },
      (error) => {
        console.error('Erro ao carregar modelos', error);
      }
    );
  }
}
