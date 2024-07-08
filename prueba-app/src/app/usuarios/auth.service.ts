import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndpoint="http://localhost:8180/oauth/token";
  private _usuario:Usuario;
  private _token:string;

  constructor(private http: HttpClient, private router:Router) { }

  login(usuario: Usuario):Observable<any>{
    const credenciales= btoa('angularapp' + ':'+'Con1tra2se3na45');
    const httpHeaders=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
  'Authorization':'Basic ' + credenciales});
    let params= new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(this.urlEndpoint, params.toString(), {headers:httpHeaders});
  }
  guardarUsuario(accessToken:any):void{
    this._usuario=new Usuario
    let datos=this.obtenerDatosToken(accessToken);
    this._usuario.nombre=datos.nombre;
    this._usuario.apellido=datos.apellido;
    this._usuario.email=datos.email;
    this._usuario.username=datos.nombre_usuario;
    this._usuario.roles=datos.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }
  guardarToken(accessToken:string):void{
    this._token=accessToken;
    sessionStorage.setItem('token',this._token);
  }
  obtenerDatosToken(accessToken:string){
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    } else {
      let usuario= sessionStorage.getItem('usuario')
      if(this._usuario == null && usuario!=null){
        this._usuario=JSON.parse(sessionStorage.getItem('usuario')) as Usuario
        return this._usuario;
      }
      return new Usuario();
    }
  }
  public get token():string{
    if (this._token!=null){
      return this._token;
    } else {
      let token= sessionStorage.getItem('token')
      if ( token!=null){
        this._token=token;
        return this._token;
      }
      return null;
    }
  }

  isAuthenticated():boolean{
    let datos= this.obtenerDatosToken(this.token);
    if (datos!=null&&datos.user_name&&datos.user_name.length>0){
      return true;
    }
    return false;
  }

  hasRole(role:string): boolean{
    return this.usuario.roles.includes(role);
  }

  logout():void{
    Swal.fire('Log out','El usuario '+this._usuario.username+' ha cerrado sesión','success' );
    this.router.navigate(['/login']);
    this._token=null;
    this._usuario=null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
