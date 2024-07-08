import { Producto } from './producto';

export class LineaFactura {
  producto:Producto;
  cantidad:number=1;
  importe: number;

  public calcularImporte():number{
    return this.cantidad * this.producto.precio;
  }
}
