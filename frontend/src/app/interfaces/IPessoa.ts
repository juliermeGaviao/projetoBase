import { IProcesso } from './IProcesso';
import { IAutoInfracao } from './IAutoInfracao';
import { ITermoApreensao } from './ITermoApreensao';

export interface IPessoa {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ddd: string;
  cpf: string;
  cnpj?: string;
  endereco: string;
  cep: string;
  nomeFantasia?: string;
  nomeRepresentante?: string;
  cpfRepresentante?: string;
  rg?: string;
  orgaoExpedidor?: string;
  nomePai?: string;
  nomeMae?: string;
  estadoCivil: string;
  logradouro: string;
  uf: string;
  cidade: string;
  bairro: string;
  autoInfracaoList?: IAutoInfracao[];
  termoApreensaoList?: ITermoApreensao[];
  processoList?: IProcesso[];
}
