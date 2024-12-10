import { IBemApreendido } from "./IBemApreendido";
import { IPessoa } from "./IPessoa";

export interface IProcessoDestinacao {
  id: number;
  quantidade: number;
  descricao: string;
  localizacao?: string;
  cpfFielDepositario?: string;
  cnpjFielDepositario?: string;
  idProcessoAdministrativo?: number;
  modalidadeDestinacao?: string;
  autuado?: IPessoa;
  bemApreendido: IBemApreendido;
}
