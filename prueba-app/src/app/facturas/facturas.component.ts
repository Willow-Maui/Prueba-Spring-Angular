import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../clientes/cliente.service';
import { Factura } from './models/factura';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FacturasService } from './services/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LineaFactura } from './models/linea-factura';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();
  myControl = new FormControl();
  filteredOptions: Observable<Producto[]>;
  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private facturasService: FacturasService, private router: Router, public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clientId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );
    /*
    filter(option => option.toLowerCase().includes(filterValue))
    */
  }

  private _filter(value: string): Observable<Producto[]> {
    //const filterValue = value.toLowerCase(); // filter(option => option.toLowerCase().includes(filterValue))
    return this.facturasService.filtarProductos(value);
  }
  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent) {
    let producto = event.option.value as Producto;

    if (this.existeLinea(producto.id)){
      this.incrementaCantidad(producto.id);
    }else{
      let nuevoItem = new LineaFactura();
          nuevoItem.producto = producto;
          nuevoItem.cantidad=1;
      this.factura.lineas.push(nuevoItem);
    }
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }
  actualizarCantidad(id: number, event: any):void {
    let cantidad: number = event.target.value as number;
    if (cantidad > 0) {
      this.factura.lineas = this.factura.lineas.map((linea: LineaFactura) => {
        if (id === linea.producto.id) {
          linea.cantidad=cantidad;
        }
        return linea;
      }
    );
  }else{
    this.eliminarLinea(id);
  }
  }

  existeLinea(id:number):boolean{
    let existe: boolean=false;
    this.factura.lineas.forEach((linea: LineaFactura) => {
     if (id === linea.producto.id) {
       existe=true;
     }
   });
   return existe;
  }
  incrementaCantidad(id:number):void{
    this.factura.lineas.forEach((linea: LineaFactura) => {
     if (id === linea.producto.id) {
       ++linea.cantidad;
     }
   });
  }
  eliminarLinea(id:number):void{
    this.factura.lineas=this.factura.lineas.filter((linea:LineaFactura)=>id !== linea.producto.id);
  }

  create():void{
    console.log(this.factura)
    this.facturasService.create(this.factura).subscribe(factura=>{
      swal.fire('Factura '+factura.id,'Factura creada con exito.','success');
      this.router.navigate(['/facturas',factura.id]);
    });
  }
}
