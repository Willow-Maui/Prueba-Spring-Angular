import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Factura } from '../../facturas/models/factura';
import { FacturasService } from '../../facturas/services/facturas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;
  //constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }
  constructor(private clienteService: ClienteService,public modalService:ModalService, public authService:AuthService, public facturasService: FacturasService) { }
  ngOnInit(): void {/*
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente
        });
      }
    });*/
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso=0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire("Error de selección", "Debe Seleccionar una imagen", "error");
      this.fotoSeleccionada = null;
    }
  }
  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire("Error de subida", "Debe Seleccionar una foto", "error")
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(//cliente=> {
        //  this.cliente=cliente;
        event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso= Math.round((event.loaded/event.total)*100);
          }else if(event.type===HttpEventType.Response){
            let response:any=event.body
            this.cliente=response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('foto subida', 'La imagen se ha subido correctamente', 'success')
          }

        });
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }
  deleteFactura(factura: Factura): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar',
      text: `¿Estás seguro de eliminar la factura: ${factura.id} del cliente ${this.cliente.nombre} ${this.cliente.apellido}?
      Se recargará la página.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminala',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturasService.deleteFactura(factura.id).subscribe(
          () => {
          //window.location.reload();
          this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura);//
          swalWithBootstrapButtons.fire(
            'Eliminada',
            'Factura eliminada',
            'success'
          );
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación ha sido cancelada',
          'error'
        )
      }
    })

  }
}
