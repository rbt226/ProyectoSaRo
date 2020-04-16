import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { ListRoomsComponent } from './components/room/list-rooms/list-rooms.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },

  {
    path: 'rooms',
    component: ListRoomsComponent,
  },
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
