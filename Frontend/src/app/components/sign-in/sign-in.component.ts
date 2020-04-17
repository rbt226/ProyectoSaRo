import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private autService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  formSignIn: FormGroup;

  ngOnInit() {
    this.formSignIn = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(data) {
    console.log('llega signIn?', data.value);
    this.autService
      .signIn({ userName: 'mail@mail.com', password: 'password' })
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          console.log('resss', res.token);
          this.router.navigate(['/users']);
        },
        (err) => {
          console.log('Error', err);
        }
      );
  }
}
