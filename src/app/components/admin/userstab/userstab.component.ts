import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

import { UserService } from '../../../services/user.service';
import { ModalService } from '../../../services/modal.service';

@Component({
	selector: 'app-userstab',
	templateUrl: './userstab.component.html',
	styleUrls: ['./userstab.component.css'],
})
export class UserstabComponent implements OnInit {
	items = [];

	constructor(private userService: UserService, private spinnerService: SpinnerService, private modalService: ModalService) {}

	ngOnInit() {
		this.spinnerService.showSpinner();

		this.userService.getUsers().subscribe((res) => {
			this.spinnerService.hideSpinner();
			this.items = res.data;
			console.log(res.data);
		});
	}
	ngShow(type, data) {
		this.modalService.showModal(type, data);
	}
}
