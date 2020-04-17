import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget; // esto es para que haga un autocompletado
}
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

  image: File;
  imageSelected: string | ArrayBuffer;

  formSignUp: FormGroup;

  ngOnInit() {
    this.formSignUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      image: [''],
    });
  }

  signUp(data) {
    console.log(data.value);
    console.log(this.image);
    // this.autService.signUp(data).subscribe(
    //   (res) => {
    //     localStorage.setItem('token', res.token);
    //     console.log('resss', res.token);
    //   },
    //   (err) => {
    //     console.log('Error', err);
    //   }
    // );
  }

  onImageSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0] as File;
      // chequea que aunque sea haya un archivo
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.image);
    }
  }
}
