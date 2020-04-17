import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private autService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  formSignUp: FormGroup;

  ngOnInit() {
    this.formSignUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp(data) {
    console.log('llega ?', data.value);
    this.autService
      .signUp({ userName: 'mail@mail.com', password: 'password' })
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          console.log('resss', res.token);
        },
        (err) => {
          console.log('Error', err);
        }
      );
  }
}
