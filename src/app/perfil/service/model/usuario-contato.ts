import { LinkSocial } from './link-social';

export interface UsuarioContato {
    id: number;
    telefone: string,
    celular01: string;
    celular01WS: boolean;
    celular02: string;
    celular02WS: boolean;
    skype: string; 
    redesSociais: LinkSocial[];
}