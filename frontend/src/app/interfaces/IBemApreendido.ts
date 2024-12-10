import { IProcesso } from './IProcesso';

import { ITipoBem } from './ITipoBem';
import { ITipoInfracao } from './ITipoInfracao';
import { IProcessoDestinacao } from './IProcessoDestinacao';
import { ITermoApreensao } from './ITermoApreensao';
import { IUnidadeMedida } from './IUnidadeMedida';

export interface IBemApreendido {
  id: number;
  quantidade: number;
  descricao?: string;
  situacaoBem: string;
  tipoBem: ITipoBem;
  tipoInfracao?: ITipoInfracao;
  processoDestinacao?: IProcessoDestinacao;
  unidadeMedida?: IUnidadeMedida;
  processo?: IProcesso;
  termoApreensao?: ITermoApreensao;
}
