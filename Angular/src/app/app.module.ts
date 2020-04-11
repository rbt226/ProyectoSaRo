import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DynamicRoutesComponent } from './components/login/dynamicRoutes/dynamicRoutes.component';

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
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutasApp),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
// se agrega
