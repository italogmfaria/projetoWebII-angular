import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserOutputDTO } from '../models/user/user-output-dto';
import { UserInputDTO } from '../models/user/user-input-dto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class PerfilComponent implements OnInit {
  userProfile: UserOutputDTO = new UserOutputDTO();
  userUpdate: UserInputDTO = new UserInputDTO();
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
        // Inicializa o objeto de atualização com os dados do perfil
        this.userUpdate.firstName = this.userProfile.firstName;
        this.userUpdate.lastName = this.userProfile.lastName;
        this.userUpdate.cpf = this.userProfile.cpf;
        this.userUpdate.phone = this.userProfile.phone;
        this.userUpdate.email = this.userProfile.email;
        this.userUpdate.cnh = this.userProfile.cnh;
      },
      (error) => {
        console.error('Erro ao carregar o perfil do usuário', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.userProfile.key) {
      this.userService.updateUserProfile(this.userProfile.key, this.userUpdate).subscribe(
        (updatedUser) => {
          this.userProfile = updatedUser;
          this.isEditing = false; // Fecha o modo de edição após salvar
        },
        (error) => {
          console.error('Erro ao atualizar o perfil do usuário', error);
        }
      );
    }
  }
}
