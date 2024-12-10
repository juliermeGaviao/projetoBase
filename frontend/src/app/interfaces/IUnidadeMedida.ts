import { IBemApreendido } from './IBemApreendido';

export interface IUnidadeMedida {
  id: number;
  descricao: string;
  notacao: string;
  sitCancelado: string;
  dataAlteracao?: Date;
  logTadEspecime: string;
  bemApreendidoList?: IBemApreendido[];
}
