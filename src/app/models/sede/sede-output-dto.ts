import { CarroOutputDTO } from "../carro/carro-output-dto";
import { EnderecoOutputDTO } from "../endereco/endereco-output-dto";

export class SedeOutputDTO {
  id!: number;
  listaCarrosDisponiveis!: CarroOutputDTO[];
  endereco!: EnderecoOutputDTO;
}
