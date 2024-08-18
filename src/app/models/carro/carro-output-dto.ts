import { Cor } from './cor-enum';
import { SedeOutputDTO } from '../sede/sede-output-dto';
import { ModeloOutputDTO } from '../modelo/modelo-output-dto'; 
import { DocumentoOutputDTO } from '../documento/documento-output-dto';

export class CarroOutputDTO {
  id!: number;
  nome!: string;
  cor!: Cor;
  disponivel!: boolean;
  kmRodados!: number;
  valorDiariaAtual!: number;
  modeloId!: number;
  sedeId!: number;
  sede!: SedeOutputDTO;
  modelo!: ModeloOutputDTO;
  documento!: DocumentoOutputDTO;
}
