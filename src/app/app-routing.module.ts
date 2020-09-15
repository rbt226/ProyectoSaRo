import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { ListRoomsComponent } from './components/room/list-rooms/list-rooms.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DetailRoomComponent } from './components/room/detail-room/detail-room.component';
import { RoomComponent } from './components/room/room.component';
import { IndexComponent } from './components/index-component/index-component.component';
import { CreateRoomComponent } from './components/room/create-room/create-room.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListFeaturesComponent } from './components/feature/list-features/list-features.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserstabComponent } from './components/admin/userstab/userstab.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/index.html',
		pathMatch: 'full',
	},
	{
		path: 'index.html',
		component: IndexComponent,
	},
	{
		path: 'rooms',
		component: RoomComponent,
		children: [
			{
				path: 'create', // child route path
				component: CreateRoomComponent, // child route component that the router renders
			},
			{
				path: '', // child route path
				component: ListRoomsComponent, // child route component that the router renders
			},
			{
				path: ':id', // child route path
				component: DetailRoomComponent, // child route component that the router renders
			},
		],
	},
	{
		path: 'users',
		component: ListUsersComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { role: 'Admin' },
	},
	{
		path: 'contact',
		component: ContactComponent,
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { role: 'Admin' },
		children: [
			{
				path: '', // child route path
				component: UserstabComponent, // child route component that the router renders
			},
			{
				path: 'userstab', // child route path
				component: UserstabComponent, // child route component that the router renders
			},
			{
				path: 'featurestab', // child route path
				component: ListFeaturesComponent, // child route component that the router renders
			},
		],
	},
	{
		path: 'signUp',
		component: SignUpComponent,
	},
	{
		path: 'createRoom',
		component: CreateRoomComponent,
	},
	{
		path: 'features',
		component: ListFeaturesComponent,
	},
	{ path: '**', redirectTo: '/' }, // si pone cualquier URL
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
