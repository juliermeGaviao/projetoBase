import { IInfosGerais } from './IInfosGerais';
import { ITipoInfracao } from './ITipoInfracao';

export interface IAutoInfracao {
  id: number;
  descricao: string;
  serAutoInfracao: string;
  municipio: string;
  uf: string;
  localInfracao: string;
  unidControle: string;
  dhAutoInfracao: string;
  dataAlteracao: string;
  valor: number;
  latitude: string;
  longitude: string;
  numeroProcesso: number;
  serApreensao:string;
  dhTermoApreensao: string;
  descricaoLocalizacao: string;
  tipoInfracao: ITipoInfracao;
  infosGerais: IInfosGerais; 
}
