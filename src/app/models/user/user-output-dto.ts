import { CNHInputDTO } from './cnh-input-dto';

export class UserOutputDTO {
  key!: number;
  firstName!: string;
  lastName!: string;
  cpf!: string;
  phone!: string;
  email!: string;
  cnh: CNHInputDTO = new CNHInputDTO();
}
