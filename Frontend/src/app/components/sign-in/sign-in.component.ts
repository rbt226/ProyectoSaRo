import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
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
        private modalService: ModalService
    ) { }

    formSignIn: FormGroup;

    ngOnInit() {
        this.formSignIn = this.formBuilder.group({
            mail: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    if (this.formSignIn.valid) {
      
      this.spinnerService.showSpinner();
      this.autService.signIn(data).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/users']);
        this.appComponent.hide();
        this.spinnerService.hideSpinner();
      });
    }
  }
}
