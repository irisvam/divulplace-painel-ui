export interface RecadoResumo {
    id: number;
    cliente: {
        id: number;
        nome: string
    };
    msg: string;
    dhEnvio: Date;
}