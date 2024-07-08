import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'
import { Region } from './region';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: String = "Crear Cliente";
  public errors:String[];
  public regiones: Region[];
  private clienteService: ClienteService;
  constructor(clienteServ: ClienteService, private router: Router, private acrivatedRoute: ActivatedRoute) {
    this.clienteService = clienteServ;
  }
  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe( regiones=>this.regiones=regiones)
  }

  cargarCliente(): void {
    this.acrivatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    })
  }
  create(): void {
    this.clienteService.create(this.cliente).subscribe(response => {
      this.router.navigate(['/clientes']);
      swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con éxito.`, "success");
    },
    err => {
      this.errors=err.error.errors as String[];
      console.error('Codigo del error: '+err.status+' \n'+err.errors)
    });
  }

  update(): void {
    this.cliente.facturas=null;
    this.clienteService.update(this.cliente).subscribe(response => {
      this.router.navigate(['/clientes']);
      swal.fire('Actualización cliente', `Cliente ${this.cliente.nombre} actualizado con éxito.`, "success");
    },
    err => {
      this.errors= err.error.errors as String[];
      console.error('Codigo del error: '+err.status);
      console.error(err.error.errors);
    });
  }
  compararRegion(r1:Region,r2:Region):boolean{
    if(r1===undefined&&r2===undefined)
      return true;
    return r1 ==null||r2==null ?false: r1.id===r2.id
  }
}
