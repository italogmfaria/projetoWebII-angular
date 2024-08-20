import { CarroOutputDTO } from '../carro/carro-output-dto';
import { ClientOutputDTO } from '../user/client-output-dto';

export class LocacaoInputDTO {
  dataInicio!: Date;
  userId!: ClientOutputDTO;
  carroId!: CarroOutputDTO;
  dataTerminoAgendado!: Date; 
}