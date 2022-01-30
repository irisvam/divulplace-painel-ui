import { EmpresaContato } from "./empresa-contato";
import { EmpresaEndereco } from "./empresa-endereco";
import { RamoAtividade } from "./ramo-atividade";

export interface ServicoEmpresa {
    id: number;
    nomeEmpresa: string,
    descricao: string;
    cnpj: string;
    urlEmpresa: string;
    urlVideo: string; 
    ramoAtividades: RamoAtividade[];
    contato: EmpresaContato;
    endereco: EmpresaEndereco;
}