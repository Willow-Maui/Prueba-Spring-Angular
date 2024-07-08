import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  desde: number;
  hasta: number;
  paginas: number[];
  MAX_PAGINAS:number=5
  constructor() { }
  ngOnInit(): void {
    this.initPaginador();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initPaginador();}

  private initPaginador(): void{
    if (this.paginador.totalPages > this.MAX_PAGINAS) {
      this.desde = Math.min( Math.max(0,this.paginador.number-(Math.trunc(this.MAX_PAGINAS/2))),this.paginador.totalPages-this.MAX_PAGINAS);
      this.hasta = Math.max( Math.min(this.paginador.number+(Math.trunc((this.MAX_PAGINAS+1)/2)),(this.paginador.totalPages)),this.MAX_PAGINAS);
      this.paginas = new Array(this.hasta-this.desde).fill(0).map((valor, indice) => indice + 1 + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
