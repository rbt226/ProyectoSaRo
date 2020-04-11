import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common//http';
import { LoginResponse } from '../others/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  api_url = 'http://localhost';

  login(user: string, pass: string): Observable<LoginResponse> {
    // return.this._http.post(‘URL/servicePath’, {payload});
    return this._http.post<LoginResponse>(`${this.api_url}/auth/login`, {
      user,
      password: pass,
    });
  }
}
