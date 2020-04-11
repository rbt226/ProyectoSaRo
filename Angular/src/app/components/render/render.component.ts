import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
})
export class RenderComponent {
  constructor(private renderer: Renderer2) {}

  mostrarActivo(elemento: HTMLElement) {
    this.renderer.addClass(elemento, 'destacado'); // Al Elemento que se pasa por parametro le asigno una clase "destacado"
  }
}
