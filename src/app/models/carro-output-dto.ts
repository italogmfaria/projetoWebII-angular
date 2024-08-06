import { Cor } from './cor-enum';

export class CarroOutputDTO {
  id!: number;
  nome!: string;
  cor!: Cor;
  disponivel!: boolean;
  kmRodados!: number;
  valorDiariaAtual!: number;
  modeloId!: number;
  sedeId!: number;
}
