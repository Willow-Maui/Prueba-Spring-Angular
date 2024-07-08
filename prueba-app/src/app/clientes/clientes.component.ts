import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service'
import { ModalService } from './detalle/modal.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  private clienteService: ClienteService;
  paginador: any;
  clienteSeleccionado: Cliente;
  constructor(clienteServ: ClienteService, private acrivatedRoute: ActivatedRoute, public modalService: ModalService, public authService:AuthService) {
    this.clienteService = clienteServ
  }

  ngOnInit(): void {
    this.acrivatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page'); //+ lo convierte en número
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(response => {
      this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    }
    );
    this.modalService.notificarUpload.subscribe(cliente=>{
      this.clientes=this.clientes.map(clienteOriginal => {
          if (clienteOriginal.id == cliente.id)
            clienteOriginal.foto = cliente.foto;
          return clienteOriginal;
        })
    })
  }
  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar',
      text: `¿Estás seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido}?
      Se recargará la página.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminalo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          window.location.reload();
          /*this.clientes = this.clientes.filter(cli => cli !== cliente);//
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El cliente ha sido eliminado',
            'success'
          );*/
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
  abrirDetalle(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
