import { UploadedFile } from "./uploadedFile.interface";

export interface Person {
    id: number;
    name: string;
    email: string;
    mobile: string;
    cpf: string;
    rg: string;
    gender: string;
    fixo?: string;
    files?: UploadedFile[];
}