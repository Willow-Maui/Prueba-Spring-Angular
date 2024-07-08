import { Component, OnInit } from '@angular/core';

import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo:string='Por favor inicie sesión'
  usuario:Usuario;
  constructor(private authService:AuthService, private router:Router) {
  this.usuario= new Usuario() }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/clientes']);
      Swal.fire('Login','Ya se está autenticado como '+this.authService.usuario.username,'info');
    }
  }

  login():void{
    if ((this.usuario.username==null)||(this.usuario.password==null)){
      Swal.fire('Error Login','han de rellenarse los campos.','error');
      return;}
    this.authService.login(this.usuario).subscribe(response=>{
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      this.router.navigate(['/clientes']);
      Swal.fire('Login','Se ha iniciado sesión como '+this.authService.usuario.username,'success');
    },err=>{
      if(err.status==400){
        Swal.fire('Error de acceso','Nombre de usuario o contraseña incorrectos','error');
      }
    })
  }

}
