import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
    formContact: FormGroup;
    formSubmitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private spinnerSevice: SpinnerService,
        private emailService: EmailService,
        private notification: NotificationService
    ) {}

    ngOnInit() {
        this.formContact = this.formBuilder.group({
            name: ['', Validators.required],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                    ),
                ],
            ],
            message: ['', Validators.required],
        });
    }

    get form() {
        return this.formContact.controls;
    }
    send(data) {
        event.preventDefault();
        this.formSubmitted = true;

        if (this.formContact.valid) {
            this.spinnerSevice.showSpinner();
            this.emailService
                .sendEmail({
                    mail: data.email,
                    name: data.name,
                    msg: data.message,
                })
                .subscribe((res) => {
                    this.notification.showSuccess('El mensaje ha sido enviado');
                    this.formContact.reset();
                    this.spinnerSevice.hideSpinner();
                });
            this.spinnerSevice.hideSpinner();
        }
    }
}
