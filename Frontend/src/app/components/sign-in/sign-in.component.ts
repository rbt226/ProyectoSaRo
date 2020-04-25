import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AppComponent } from 'src/app/app.component';

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
    private appComponent: AppComponent,
  ) {}

  formSignIn: FormGroup;

  ngOnInit() {
    this.formSignIn = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(data) {
    this.spinnerService.showSpinner();
    this.autService.signIn(data).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/users']);
      this.appComponent.hide();
      this.spinnerService.hideSpinner();
    });
  }
}
