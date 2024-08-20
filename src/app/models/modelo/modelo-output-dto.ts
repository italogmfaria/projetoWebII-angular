import { CarroOutputDTO } from '../carro/carro-output-dto';

export class ModeloOutputDTO {
  id!: number;
  fabricante!: string;
  anoFabricacao!: string;
  categoria!: string;
  carros!: CarroOutputDTO[];
}