class Mensagem {
    id: number;
    afiliado: {
        id: number;
        nome: string;
        img: string;
    };
    msg: string;
    dhEnvio: Date;
}