import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-basico',
  templateUrl: './formulario-basico.component.html',
  styleUrls: ['./formulario-basico.component.css'],
})
export class FormularioBasicoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(dato) {
    console.log(dato.value);
  }
}
