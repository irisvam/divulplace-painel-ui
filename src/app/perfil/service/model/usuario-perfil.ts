export interface UsuarioPerfil {
    id: number;
    codigo: string,
    tratamento: string;
    img: string;
    nome: string;
    apelido: string;
    cpf: string; 
    dataNascimento: Date;
    estadoCivil: string;
    sexo: string;
    email: string;
    link: string;
}