import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaPrueba: string[]= ['A', 'B', 'C', 'D', 'E'];
  ocultar:boolean = false;
  constructor() { }

  setOcultar():void {
    this.ocultar = (this.ocultar==false)
  }
}
