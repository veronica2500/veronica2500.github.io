export class Balances{
    noCuenta: number;
    cuenta: string;
    tipo: string;
    categoria: string;
    saldo: number;

    constructor(noCuenta: number, cuenta: string, tipo: string, categoria: string,saldo: number)
    {
        this.noCuenta = noCuenta;
        this.cuenta=cuenta;
        this.tipo=tipo;
        this.categoria = categoria;
        this.saldo=saldo;
    }
}