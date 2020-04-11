import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dynamicRoutes',
  templateUrl: './dynamicRoutes.component.html',
  styleUrls: ['./dynamicRoutes.component.css'],
})
export class DynamicRoutesComponent implements OnInit {
  constructor(private ruta: ActivatedRoute) {}
  paramId: number;

  ngOnInit() {
    // es asincrono, voy a ejecutar cuando params tenga info
    this.ruta.params.subscribe((params) => {
      this.paramId = params.paramId; // aca va el name del param que se definio en las rutas
    });
  }
}
