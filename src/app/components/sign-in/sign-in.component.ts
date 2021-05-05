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
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private spinnerService: SpinnerService,
		public modalService: ModalService,
		private emailService: EmailService,
		private notification: NotificationService,
		private usrService: UserService,
		private socialAuthService: SocialAuthService,
		private authService: AuthService,
	) { }

	formSignIn: FormGroup;
	formSubmitted = false;
	user: SocialUser;
	loggedIn: boolean;
	forgotPass = false;

	ngOnInit() {
		this.formSignIn = this.formBuilder.group({
			email: ['', [Validators.pattern('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$')]],
			password: ['', Validators.required],
		});
		this.socialAuthService.authState.subscribe((user) => {
			console.log("user", JSON.stringify(user));
			this.user = user;
			this.loggedIn = (user != null);

		});
	}

	get form() {
		return this.formSignIn.controls;
	}

	signInWithGoogle(): void {
		this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
			//on success
			//this will return user data from google. What you need is a user token which you will send it to the server
			this.loginSocial(userData);
		});
	}

	signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	signOut(): void {
		this.socialAuthService.signOut();
	}




	signIn(data) {
		event.preventDefault();
		this.formSubmitted = true;
		if (this.formSignIn.valid) {
			this.spinnerService.showSpinner();
			if (this.forgotPass) {
				return this.forgotPassword(data)
			}
			this.login(data);
		}

	}

	loginSocial(user) {
		this.authService.signInSocial(user).subscribe((res) => {
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

	login(data) {
		this.authService.signIn(data).subscribe((res) => {
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

	forgotPassword(data) {
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
			} else {
				this.spinnerService.hideSpinner();
				this.notification.showError(res.message);
			}
		});
	}
	loginService() {

	}
}
