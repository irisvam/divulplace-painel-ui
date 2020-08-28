export interface Novidade {
    id: number;
    afiliado: {
        id: number;
        nome: string;
        img: string;
        nivel: string;
    };
    info: string;
    dhInfo: Date;
    qtdeViews: number;
    modificacoes: [
        {
        titulo: string;
        descricoes: [
            { acao: string; }
        ];
        }
    ];
    inclusoes: [
        {
        titulo: string;
        descricao: string;
        img: string;
        }
    ];
}