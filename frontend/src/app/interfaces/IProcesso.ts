import { IPessoa } from './IPessoa';
import { IBemApreendido } from './IBemApreendido';
import { IAutoInfracao } from './IAutoInfracao';

export interface IProcesso {
  id: number;
  descricao: string;
  dataAlteracao?: Date;
  numeroProcesso: number;
  autoInfracao?: IAutoInfracao;
  processado: IPessoa;
  bemApreendidoList?: IBemApreendido[];
}
