import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DynamicRoutesComponent } from './components/login/dynamicRoutes/dynamicRoutes.component';
import { FormularioBasicoComponent } from './components/forms/formulario-basico/formulario-basico.component';
import { FormularioReactivoComponent } from './components/forms/formulario-reactivo/formulario-reactivo.component';

const rutasApp: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dynamic-routes/:paramId',
    component: DynamicRoutesComponent,
  },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, FormularioReactivoComponent, FormularioBasicoComponent],
  imports: [
    BrowserModule,
    FormsModule, // Para formularios clasicos
    HttpClientModule,
    RouterModule.forRoot(rutasApp),
    ReactiveFormsModule, // Para formularios reactivos
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
// se agrega
