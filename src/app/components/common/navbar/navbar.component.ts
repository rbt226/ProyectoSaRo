import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	constructor(public authService: AuthService, private modalService: ModalService) {}

	public isMenuCollapsed = true;

	ngShow(type) {
		this.modalService.showModal(type, null);
	}
}
