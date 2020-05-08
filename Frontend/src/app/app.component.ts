import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from './services/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Consultorios Del Parque';
    registerForm: FormGroup;
    submitted = false;
    type: string;

    constructor(
        private formBuilder: FormBuilder,
        public modalService: ModalService
    ) { }


    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
    // convenience getter for easy access to form fields

    get f() {
        return this.registerForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        if (this.submitted) {
            this.modalService.hideModal();
        }
    }
}
