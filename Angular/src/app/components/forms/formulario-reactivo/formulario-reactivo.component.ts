import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-reactivo',
  templateUrl: './formulario-reactivo.component.html',
  styleUrls: ['./formulario-reactivo.component.css'],
})
export class FormularioReactivoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  formulario: FormGroup;

  ngOnInit() {
    this.formulario = this.fb.group({ // aca se definen los datos que va a tener el formulario y sus validaciones
      userName: ['Sabri', [Validators.required, Validators.minLength(3)]], // Valores por defecto y luego los validadores
      email: ['', [Validators.required, Validators.email]], // concatenan varios
    });
  }

  onSubmit(datos) {
    console.log(datos.value);
  }
}
