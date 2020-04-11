import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private _user: UserService, private _api: ApiService) {}

  user = 'Sa';
  password = 'Pass';

  ngOnInit(): void {}

  login() {
    this._api.login(this.user, this.password).subscribe((response) => {
      if (response.success) {
        this._user.user = response.user;
        console.log('a');
      }
    });
  }
}
