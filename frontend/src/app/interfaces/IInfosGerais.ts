import { IPessoa } from "./IPessoa";

export interface IInfosGerais {
    id: number;
    numeroProcesso: string;
    dataAbertura: Date;
    autuado: IPessoa;
}
