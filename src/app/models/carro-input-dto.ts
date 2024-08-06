import { Cor } from './cor-enum';

export class CarroInputDTO {
  nome!: string;
  cor!: Cor;
  disponivel!: boolean;
  kmRodados!: number;
  valorDiariaAtual!: number;
  modeloId!: number;
  sedeId!: number;
}
