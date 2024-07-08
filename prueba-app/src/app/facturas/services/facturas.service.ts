import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private urlEndPoint: string= 'http://localhost:8180/api/facturas';
  constructor(private http: HttpClient) { }

  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }
  deleteFactura(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
  filtarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtro-productos/${term}`);
  }
  create(factura:Factura):Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPoint,factura);
  }
}
