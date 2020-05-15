import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Utils from '../../utils/utils';

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
        private notification: NotificationService,
        private usrService: UserService
    ) { }

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
                    this.spinnerService.hideSpinner();
                    if (Utils.isOkResponse(res)) {
                        this.usrService.setUserData(res.data.user_name, res.data.image_user);
                        localStorage.setItem('token', res.token);
                        this.router.navigate(['/']);
                        this.formSignIn.reset();
                        this.modalService.hideModal();
                    } else {
                        this.notification.showError(res.message);
                    }
                });
            }
        } else {
            this.usrService.getUserByEmail(data).subscribe((res) => {
                if (Utils.isOkResponse(res)) {
                    this.emailService
                        .sendEmail({
                            action: 'forgot',
                            to: data.email,
                        })
                        .subscribe((resEmail) => {
                            this.spinnerService.hideSpinner();
                            this.notification.showSuccess(resEmail.message);
                            this.router.navigate(['/']);
                            this.formSignIn.reset();
                            this.modalService.hideModal();
                        });
                }
                else {
                    this.spinnerService.hideSpinner();
                    this.notification.showError(res.message);
                }
            });
        }
    }
}
