class Novidade {
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
        tipo: string;
        titulo: string;
        descricao: string;
        img: string;
        }
    ];
}