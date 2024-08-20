import { Cor } from './cor-enum';
import { SedeOutputDTO } from '../sede/sede-output-dto';
import { ModeloOutputDTO } from '../modelo/modelo-output-dto'; 
import { DocumentoOutputDTO } from '../documento/documento-output-dto';

export class CarroOutputDTO {
  id!: number;
  nome!: string;
  cor!: Cor;
  kmRodados!: number;
  valorDiariaAtual!: number;
  disponivel!: boolean;
  modelo!: ModeloOutputDTO;
  sede!: SedeOutputDTO;
  documento!: DocumentoOutputDTO;
}
