import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private URL = 'http://localhost:3300/users';
    public userName: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(user) {
        return this.http.post<any>(this.URL + '/signUp', user);
    }
    signIn(user) {
        this.http.post<User>(this.URL + '/byEmail', user).subscribe((res) => {
            localStorage.setItem('userName', res.user_name);
            localStorage.setItem('userImg', res.image_user);
        });
        return this.http.post<any>(this.URL + '/signIn', user);
    }

    getUserName() {
        return localStorage.getItem('userName');
    }
    getUserImg() {
        return localStorage.getItem('userImg');
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
        localStorage.removeItem('userName');
        localStorage.removeItem('userImg');
        this.router.navigate(['/']);
    }
}
