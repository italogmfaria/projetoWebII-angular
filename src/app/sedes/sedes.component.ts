import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SedesService } from '../services/sede.service';
import { SedeOutputDTO } from '../models/sede/sede-output-dto';
import { SedeInputDTO } from '../models/sede/sede-input-dto';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class SedesComponent implements OnInit {
  sedes: SedeOutputDTO[] = [];
  carrosDisponiveis: CarroOutputDTO[] = [];
  newSede: SedeInputDTO = {
    endereco: {
      rua: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  };
  editingSede: SedeOutputDTO | null = null;
  showAddForm = false;
  showCarrosDisponiveis = false;

  constructor(private sedesService: SedesService) { }

  ngOnInit(): void {
    this.loadSedes();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newSede = {
      endereco: {
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    };
  }

  cancelEdit(): void {
    this.editingSede = null;
  }

  addSede(): void {
    this.sedesService.createSede(this.newSede).subscribe(() => {
      this.loadSedes();
      this.newSede = {
        endereco: {
          rua: '',
          bairro: '',
          cidade: '',
          estado: ''
        }
      };
      this.showAddForm = false; 
    });
  }

  editSede(sede: SedeOutputDTO): void {
    this.editingSede = { ...sede };
  }

  updateSede(): void {
    if (this.editingSede) {
      const sedeInput: SedeInputDTO = {
        endereco: this.editingSede.endereco
      };
      this.sedesService.updateSede(this.editingSede.id, sedeInput).subscribe(() => {
        this.loadSedes();
        this.editingSede = null;
      });
    }
  }

  deleteSede(id: number): void {
    this.sedesService.deleteSede(id).subscribe(() => {
      this.loadSedes();
    });
  }
  loadSedes(): void {
    this.sedesService.getAllSedes().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Erro ao carregar sedes', error);
      }
    );
  }

  loadCarrosDisponiveis(sedeId: number): void {
    this.sedesService.getCarrosBySede(sedeId).subscribe(
      data => {
        this.carrosDisponiveis = data.map(carro => {
          return carro;
        });
        this.showCarrosDisponiveis = true;
      },
      error => console.error('Erro ao carregar carros disponíveis', error)
    );
  }
  

  closeCarrosDisponiveis(): void {
    this.showCarrosDisponiveis = false;
    this.carrosDisponiveis = [];
  }
}
