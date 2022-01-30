export interface EmpresaEndereco {
    id: number;
    pais: string,
    cep: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    estado: string,
    cidadeId: number,
    cidade: string
}