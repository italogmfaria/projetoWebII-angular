import { DocumentoInputDTO } from '../documento/documento-input-dto';
import { ModeloInputDTO } from '../modelo/modelo-input-dto';
import { SedeInputDTO } from '../sede/sede-input-dto';
import { Cor } from './cor-enum';

export class CarroInputDTO {
  nome!: string;
  cor!: Cor;
  kmRodados!: number;
  valorDiariaAtual!: number;
  disponivel!: boolean;
  modelo!: ModeloInputDTO;
  sede!: SedeInputDTO;
  documento!: DocumentoInputDTO;
}