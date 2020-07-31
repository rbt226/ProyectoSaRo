import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	activeItem: MenuItem[];

	ngOnInit() {
		this.activeItem = [
			{ label: 'Usuarios', icon: 'pi pi-fw pi-users ' },
			{ label: 'Consultorios', icon: 'pi pi-fw pi-home' },
			{ label: 'Prestaciones', icon: 'pi pi-fw pi-check' },
			{ label: 'Reservas', icon: 'pi pi-fw pi-calendar' },
		];
	}
}
