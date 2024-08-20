import { CarroOutputDTO } from '../carro/carro-output-dto';
import { ClientOutputDTO } from '../user/client-output-dto';
import { StatusLocacao } from '../locacao/status-locacao-enum';
import { StatusPagamento } from './status-pagamento-enum';

export class LocacaoOutputDTO {
  id!: number;
  dataInicio!: Date;
  dataFinalizacao?: Date;
  statusLocacao!: StatusLocacao;
  user!: ClientOutputDTO;
  carro!: CarroOutputDTO;
  valorFinal!: number;
  dataTerminoAgendado?: Date; 
  taxaDesconto?: number; 
  multaAtraso?: number; 
  statusPagamento!: StatusPagamento;
}