import { IPessoa } from './IPessoa';
import { IAutoInfracao } from './IAutoInfracao';
import { IBemApreendido } from './IBemApreendido';

export interface ITermoApreensao {
  id: number;
  serApreensao: string;
  valor?: number;
  descricao?: string;
  sitCancelado: string;
  dhTermoApreensao: Date;
  dataAlteracao?: Date;
  descricaoLocalizacao?: string;
  descricaoLocalDeposito?: string;
  numeroProcesso?: number;
  autoInfracao?: IAutoInfracao;
  autuado?: IPessoa;
  bemApreendidoList?: IBemApreendido[];
}
