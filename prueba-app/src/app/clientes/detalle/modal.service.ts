import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  _modal:boolean =false;
  private _notificarUpload=new EventEmitter<any>();
  constructor() { }
  abrirModal(){
    this._modal=true;
  }
  cerrarModal(){
    this._modal=false;
  }
  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }
}
