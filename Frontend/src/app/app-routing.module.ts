import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { ListRoomsComponent } from './components/room/list-rooms/list-rooms.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },

  {
    path: 'rooms',
    component: ListRoomsComponent,
  },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
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
