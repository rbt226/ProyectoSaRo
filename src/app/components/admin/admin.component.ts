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
			{ label: 'Usuarios', icon: 'pi pi-fw pi-users ', routerLink: 'userstab' },
			{ label: 'Consultorios', icon: 'pi pi-fw pi-home' },
			{ label: 'Prestaciones', icon: 'pi pi-fw pi-check' },
			{ label: 'Reservas', icon: 'pi pi-fw pi-calendar' },
		];
	}
}

// @Component({
// 	selector: 'app-userstab',
// 	template: `
// 		<h3>Inline Message CSS</h3>
// 		<p>p-message component is used to display inline messages mostly within forms.</p>
// 	`,
// })
// export class UserstabComponent {

// }
