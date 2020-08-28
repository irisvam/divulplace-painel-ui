export interface MensagemAfiliado {
    id: number;
    msg: string;
    dhEnvio: Date;
    afiliadoId: number;
    afiliado: {
        id: number;
        nome: string;
        img: string;
    };
}