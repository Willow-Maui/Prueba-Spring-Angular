import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Cliente } from './cliente';
//import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs'
import { catchError, map} from 'rxjs/operators'
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import swal from 'sweetalert2'
import { Router } from '@angular/router'
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8180/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private router: Router) { }

/*
  private agragarAuthorizationheader(){
    let token=this.authService.token;
    if (token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }
*/
  getClientes(page:number): Observable<any> {
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint)
    ///*
    return this.http.get(this.urlEndPoint+'/page/'+ page).pipe(
      map((response:any) =>{
        (response.content as Cliente[]).map(cliente=>{
          //cliente .nombre=cliente.nombre.toUpperCase();
          //cliente.createAt=formatDate(cliente.createAt,'EEEE, d MMMM yyyy','es');
          return cliente;
        });
        return response;
      })
    )//*/
  }

  create(cliente: Cliente): Observable<Cliente> {
  //  return this.http.post(this.urlEndPoint, cliente, { headers: this.agragarAuthorizationheader() }).pipe(
  return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }
      ))
  }

  getCliente(id: number): Observable<Cliente> {
    //return  this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status!=401){
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');}
        return throwError(e);
      }
      ))
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }
      ))
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }
    ))
  }
  //subirFoto(archivo: File, id): Observable<Cliente>
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData: FormData= new FormData();
    formData.append('archivo',archivo);
    formData.append('id',id);/*
    let token=this.authService.token;
    let httpHeaders=new HttpHeaders;
    if (token!=null){
      httpHeaders=httpHeaders.append('Authorization','Bearer '+token);
    }*/
    const req= new HttpRequest('POST',`http://localhost:8180/api/uploads`, formData,{reportProgress: true, headers: new HttpHeaders() });
    return this.http.request(req);
    /*
    return this.http.post(`${this.urlEndPoint}/uploads`, formData).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
    */
  }
  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`http://localhost:8180/api/regiones`, { headers: this.httpHeaders }).pipe(
      catchError(e =>{
        return throwError(e);
      })
    );
  }

}
