import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3300/users';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user) {
    return this.http.post<any>(this.URL + '/signUp', user);
  }
  signIn(user) {
    return this.http.post<any>(this.URL + '/signIn', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decode() {
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signIn']);
  }
}