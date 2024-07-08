import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hola mundo';
  curso:string = 'Curso Spring 5 con Angular';
  texto:string = 'bottom text';
}
