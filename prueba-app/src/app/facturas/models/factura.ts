import { Cliente } from 'src/app/clientes/cliente';
import {LineaFactura} from './linea-factura'
export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  lineas: LineaFactura[]=[];
  cliente: Cliente;
  total:number;
  createAt:string;

  public calcularTotal():number{
    this.total=0;
    this.lineas.forEach((lin:LineaFactura)=>this.total+=lin.calcularImporte())
    return this.total;
  }
}
