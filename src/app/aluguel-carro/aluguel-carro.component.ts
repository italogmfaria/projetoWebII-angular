import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarroService } from '../services/carro.service';
import { CarroOutputDTO } from '../models/carro/carro-output-dto';
import { CommonModule } from '@angular/common'; 
import { NgFor } from '@angular/common'; 

@Component({
  selector: 'app-aluguel-carro',
  templateUrl: './aluguel-carro.component.html',
  styleUrls: ['./aluguel-carro.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor] 
})
export class AluguelCarroComponent implements OnInit {
  carro!: CarroOutputDTO;

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

  // Métodos para lidar com o processo de aluguel
}
