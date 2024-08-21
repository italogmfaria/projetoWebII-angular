import { CarroOutputDTO } from '../carro/carro-output-dto';
import { UserOutputDTO } from '../user/user-output-dto';
import { StatusLocacao } from '../locacao/status-locacao-enum';
import { StatusPagamento } from './status-pagamento-enum';

export class LocacaoOutputDTO {
  key!: number;
  dataInicio!: Date;
  dataFinalizacao?: Date;
  statusLocacao!: StatusLocacao;
  user!: UserOutputDTO;
  carro!: CarroOutputDTO;
  valorFinal!: number;
  dataTerminoAgendado?: Date; 
  taxaDesconto?: number; 
  multaAtraso?: number; 
}
