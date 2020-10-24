import { RedeSocial } from 'src/app/shared/model/rede-social';

export interface LinkSocial {
    id: number
    url: string;
    icone: string;
    situacao: boolean;
    edicao: boolean;
}