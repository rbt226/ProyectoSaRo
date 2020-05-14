import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
    constructor(
        private autService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private spinnerService: SpinnerService,
        public modalService: ModalService,
        private emailService: EmailService,
        private notification: NotificationService
    ) {}

    formSignIn: FormGroup;
    formSubmitted = false;
    forgotPass = false;

    ngOnInit() {
        this.formSignIn = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
            password: ['', Validators.required],
        });
    }

    get form() {
        return this.formSignIn.controls;
    }

    signIn(data) {
        event.preventDefault();
        this.formSubmitted = true;
        this.spinnerService.showSpinner();
        if (!this.forgotPass) {
            if (this.formSignIn.valid) {
                this.autService.signIn(data).subscribe((res) => {
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/']);
                    this.formSignIn.reset();
                    this.modalService.hideModal();
                    this.spinnerService.hideSpinner();
                });
            }
        } else {
            this.emailService
                .sendEmail({
                    action: "forgot",
                    to: data.email
                })
                .subscribe((res) => {
                    this.notification.showSuccess('El correo ha sido enviado');
                    this.router.navigate(['/']);
                    this.formSignIn.reset();
                    this.modalService.hideModal();
                    this.spinnerService.hideSpinner();
                });
        }
    }
}
