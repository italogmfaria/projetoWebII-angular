import { CarroOutputDTO } from "../carro/carro-output-dto";
import { UserOutputDTO } from "../user/user-output-dto";


export class LocacaoInputDTO {
  dataInicio!: Date;
  userId!: number;
  carroId!: number;
  dataTerminoAgendado?: Date; 
}
