import { CNHInputDTO } from '././cnh-input-dto';

export class ClientInputDTO {
  key?: number;
  firstName!: string;
  lastName!: string;
  cpf!: string;
  phone!: string;
  email!: string;
  password!: string;
  cnh: CNHInputDTO = new CNHInputDTO();
}
