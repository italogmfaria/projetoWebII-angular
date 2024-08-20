import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../services/cliente.service';
import { UserOutputDTO } from '../models/user/user-output-dto';
import { UserInputDTO } from '../models/user/user-input-dto';
import { CNHInputDTO } from '../models/user/cnh-input-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class ClientesComponent implements OnInit {
  clientes: UserOutputDTO[] = [];
  newCliente: UserInputDTO = {
    firstName: '',
    lastName: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    cnh: new CNHInputDTO()
  };
  editingCliente: UserOutputDTO | null = null;
  showAddForm = false;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAdd(): void {
    this.showAddForm = false;
    this.newCliente = {
      firstName: '',
      lastName: '',
      cpf: '',
      phone: '',
      email: '',
      password: '',
      cnh: new CNHInputDTO()
    };
  }

  cancelEdit(): void {
    this.editingCliente = null;
  }

  editCliente(cliente: UserOutputDTO): void {
    this.editingCliente = { ...cliente };
  }

  updateCliente(): void {
    if (this.editingCliente) {
      const clienteInput: UserInputDTO = {
        firstName: this.editingCliente.firstName,
        lastName: this.editingCliente.lastName,
        cpf: this.editingCliente.cpf,
        phone: this.editingCliente.phone,
        email: this.editingCliente.email,
        cnh: this.editingCliente.cnh
      };
      this.clientesService.updateCliente(this.editingCliente.key, clienteInput).subscribe(() => {
        this.loadClientes();
        this.editingCliente = null;
      });
    }
  }

  deleteCliente(id: number): void {
    this.clientesService.deleteCliente(id).subscribe(() => {
      this.loadClientes();
    });
  }

  loadClientes(): void {
    this.clientesService.getAllClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }
}
