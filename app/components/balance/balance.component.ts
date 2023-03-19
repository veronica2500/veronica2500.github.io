import { Component } from '@angular/core';
import { Balances } from 'src/app/models/balances';

@Component({
  selector: 'app-balances',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalancesComponent {
  listBalance: Balances[] = [];
  cuentasCirculantes: {"activo": Balances, "pasivo": Balances}[] = [];
  cuentasFijas: {"activo": Balances, "pasivo": Balances}[] = [];
  cuentasCapital: Balances[] = [];
  cuenta: string = "";
  tipo: string = "";
  descripcion: string = "";
  saldo: number = 0;
  keyStorage: string = 'todos';
  total_activo: number = 0;
  total_pasivo: number = 0;
  total_capital: number = 0;
  msg: string = "";
  msgerror: string = "";
  movimiento: string = "";
  cuentah: string = "";
  monto: number = 0;
  nombreEmpresa: string = "Empresa Vero";

  constructor() {

  }

  

  ngOnInit(): void {
    this.msgerror = "";
    const localStorageItem = localStorage.getItem(this.keyStorage);
    if (!localStorageItem || JSON.parse(localStorageItem).length == 0) {
      this.inicializar();
      localStorage.setItem(this.keyStorage, JSON.stringify([]));
    }
    else {
      this.listBalance = JSON.parse(localStorageItem);
    }
    this.hacerPares();
    this.contar();
  }

  contar(){
    this.total_activo = 0;
    this.total_pasivo = 0;
    this.total_capital = 0;
    this.listBalance.forEach(cuenta => {
      if(cuenta.tipo == "Activo"){
        this.total_activo += cuenta.saldo;
      } else if (cuenta.tipo == "Pasivo"){
        this.total_pasivo += cuenta.saldo;
      } else {
        this.total_capital += cuenta.saldo;
      }
    })
    if (this.total_activo === (this.total_pasivo + this.total_capital)) {
      this.msg = "La cuenta cuadra";
    } else {
      this.msg = "La cuenta NO cuadra";
    }

  }

  hacerPares() {
    this.listBalance.forEach(cuenta => {
      if (cuenta.tipo == "Activo" && cuenta.categoria == "Circulante") {
        const par = {
          "activo": cuenta,
          "pasivo": new Balances(0, "", "", "", 0)
        };
        this.cuentasCirculantes.push(par);
      }
    });
    let cont = 0;
    this.listBalance.forEach(cuenta => {
      if (cuenta.tipo == "Pasivo" && cuenta.categoria == "Circulante") {
        if (cont < this.cuentasCirculantes.length) {
          this.cuentasCirculantes[cont]["pasivo"] = cuenta;
          cont++;
        } else {
          const par = {
            "activo": new Balances(0, "", "", "", 0),
            "pasivo": cuenta
          }
          this.cuentasCirculantes.push(par);
        }
      }
    });

    this.listBalance.forEach(cuenta => {
      if (cuenta.tipo == "Activo" && cuenta.categoria == "Fijo") {
        const par = {
          "activo": cuenta,
          "pasivo": new Balances(0, "", "", "", 0)
        };
        this.cuentasFijas.push(par);
      }
    });
    cont = 0;
    this.listBalance.forEach(cuenta => {
      if (cuenta.tipo == "Pasivo" && cuenta.categoria == "Fijo") {
        if (cont < this.cuentasFijas.length) {
          this.cuentasFijas[cont]["pasivo"] = cuenta;
          cont++;
        } else {
          const par = {
            "activo": new Balances(0, "", "", "", 0),
            "pasivo": cuenta
          }
          this.cuentasFijas.push(par);
        }
      }
    });
    this.listBalance.forEach(cuenta => {
      if (cuenta.tipo == "Capital") {
        this.cuentasCapital.push(cuenta);
      }
    });

    // localStorage.setItem(this.keyStorage, JSON.stringify(this.cuentasCirculantes));
    // localStorage.setItem(this.keyStorage, JSON.stringify(this.cuentasFijas));
  }

  inicializar() {
    const cuentasIniciales = [
      {
        "noCuenta": 1100,
        "cuenta": "Caja",
        "tipo": "Activo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 1200,
        "cuenta": "Bancos",
        "tipo": "Activo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 1300,
        "cuenta": "Clientes",
        "tipo": "Activo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 1400,
        "cuenta": "Almacenes",
        "tipo": "Activo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 1500,
        "cuenta": "Deudores Diversos",
        "tipo": "Activo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 1600,
        "cuenta": "Edificios",
        "tipo": "Activo",
        "categoria": "Fijo",
        "saldo": 0
      },
      {
        "noCuenta": 1700,
        "cuenta": "Equipo de Transporte",
        "tipo": "Activo",
        "categoria": "Fijo",
        "saldo": 0
      },
      {
        "noCuenta": 2100,
        "cuenta": "Proveedores",
        "tipo": "Pasivo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 2200,
        "cuenta": "Documentos por pagar",
        "tipo": "Pasivo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 2300,
        "cuenta": "Acreedores Diversos",
        "tipo": "Pasivo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 2400,
        "cuenta": "Impuestos por pagar",
        "tipo": "Pasivo",
        "categoria": "Circulante",
        "saldo": 0
      },
      {
        "noCuenta": 2500,
        "cuenta": "Acreedores Hipotecarios",
        "tipo": "Pasivo",
        "categoria": "Fijo",
        "saldo": 0
      },
      {
        "noCuenta": 3100,
        "cuenta": "Capital Social",
        "tipo": "Capital",
        "categoria": "Contable",
        "saldo": 0
      },
      {
        "noCuenta": 3200,
        "cuenta": "Utilidades Retenidas",
        "tipo": "Capital",
        "categoria": "Contable",
        "saldo": 0
      },
    ];

    cuentasIniciales.forEach(cuentaInicial => {
      const balanceo: Balances = {
        noCuenta: cuentaInicial.noCuenta,
        cuenta: cuentaInicial.cuenta,
        tipo: cuentaInicial.tipo,
        categoria: cuentaInicial.categoria,
        saldo: cuentaInicial.saldo
      }
      this.listBalance.push(balanceo);

    });
    localStorage.setItem(this.keyStorage, JSON.stringify(this.listBalance));


  }

  agregarBalanceo() {

    const balanceo: Balances = {
      noCuenta: 0,
      cuenta: "",
      tipo: "",
      categoria: "",
      saldo: 0
    }
    this.listBalance.push(balanceo);
    this.cuenta = "";
    this.tipo = "";
    this.descripcion = "";
    this.saldo = 0;
    localStorage.setItem(this.keyStorage, JSON.stringify(this.listBalance));
  }
  eliminarBalanceo(index: number): void {
    this.listBalance.splice(index, 1);
    localStorage.setItem(this.keyStorage, JSON.stringify(this.listBalance));
  }

  hacerMovimiento() {
    let i = 0;
    for (let balance of this.listBalance) {
        if (balance.cuenta === this.cuentah) {
          if (balance.tipo === 'Activo') {
            if (this.movimiento === 'Haber') {
              balance.saldo += this.monto;
            } else if (this.movimiento === 'Debe') {
              if (this.monto<=balance.saldo) {
                balance.saldo -= this.monto;
              }else{
                this.msgerror="Error se quita mas de lo que se puede"
              }
            }
          } else if (balance.tipo === 'Pasivo' || balance.tipo === 'Capital') {
            if (this.movimiento === 'Haber') {
              if (this.monto<=balance.saldo) {
                balance.saldo -= this.monto;
              }else{
                this.msgerror="Error se quita mas de lo que se puede"
              }
            } else if (this.movimiento === 'Debe') {
              balance.saldo += this.monto;
            }
          }
          // this.listBalance[i] = balance;
          break;
        }
        i++;
    }
    localStorage.setItem(this.keyStorage, JSON.stringify(this.listBalance));
    this.movimiento = "";
    this.cuentah = "";
    this.monto = 0;
    this.contar();
  }

}

