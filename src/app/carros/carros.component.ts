import { Component, OnInit } from "@angular/core";
import { CarroInputDTO } from "../models/carro/carro-input-dto";
import { CarroOutputDTO } from "../models/carro/carro-output-dto";
import { Cor } from "../models/carro/cor-enum";
import { ModeloOutputDTO } from "../models/modelo/modelo-output-dto";
import { SedeOutputDTO } from "../models/sede/sede-output-dto";
import { CarroService } from "../services/carro.service";
import { ModelosService } from "../services/modelo.service";
import { SedesService } from "../services/sede.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SedeInputDTO } from "../models/sede/sede-input-dto";
import { ModeloInputDTO } from "../models/modelo/modelo-input-dto";

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

  modelos: ModeloOutputDTO[] = [];
  sedes: SedeOutputDTO[] = [];

  newCarro: CarroInputDTO = {
    nome: '',
    cor: Cor.BRANCO,
    kmRodados: 0,
    valorDiariaAtual: 0,
    disponivel: true,
    modeloId: 0, // Usando IDs
    sedeId: 0, // Usando IDs
    documento: {
      placa: '',
      renavam: '',
      crv: '',
      chassi: '',
      exercicio: new Date(),
      exercicioPago: false
    },
    modelo: new ModeloInputDTO,
    sede: new SedeInputDTO
  };
  
  editingCarro: CarroOutputDTO | null = null;
  showAddForm = false;
  showDetailsForm = false;

  constructor(
    private carroService: CarroService,
    private modeloService: ModelosService,
    private sedeService: SedesService
  ) {}

  ngOnInit(): void {
    this.loadCarros();
    this.loadModelos();
    this.loadSedes();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.resetNewCarro();
  }

  cancelEdit(): void {
    this.editingCarro = null;
  }

  resetNewCarro(): void {
    this.newCarro = {
      nome: '',
      cor: Cor.BRANCO,
      kmRodados: 0,
      valorDiariaAtual: 0,
      disponivel: true,
      modeloId: 0,
      sedeId: 0,
      documento: {
        placa: '',
        renavam: '',
        crv: '',
        chassi: '',
        exercicio: new Date(),
        exercicioPago: false,
      }
      ,modelo: new ModeloInputDTO,
      sede: new SedeInputDTO
    };
    
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
        modelo: this.editingCarro.modelo, // Usando IDs
        sede: this.editingCarro.sede, // Usando IDs
        documento: this.editingCarro.documento,
        modeloId: 0,
        sedeId: 0
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
      (data: CarroOutputDTO[]) => {
        this.carros = data;
      },
      (error: any) => {
        console.error('Erro ao carregar carros', error);
      }
    );
  }

  loadModelos(): void {
    this.modeloService.getAllModelos().subscribe(
      (data: ModeloOutputDTO[]) => {
        this.modelos = data;
      },
      (error: any) => {
        console.error('Erro ao carregar modelos', error);
      }
    );
  }

  loadSedes(): void {
    this.sedeService.getAllSedes().subscribe(
      (data: SedeOutputDTO[]) => {
        this.sedes = data;
      },
      (error: any) => {
        console.error('Erro ao carregar sedes', error);
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