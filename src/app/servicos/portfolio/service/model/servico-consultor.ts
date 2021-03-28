import { RamoAtividade } from "./ramo-atividade";

export interface ServicoConsultor {
    id: number;
    nomeEmpresa: string,
    descricao: string;
    identificacao: string;
    urlEmpresa: string;
    urlVideo: string; 
    ramoAtividades: RamoAtividade[];
}