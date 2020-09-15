import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Globals } from '../globals';
import { SocialAuthService } from "angularx-social-login";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private URL: string;
    private URL_CLIENT: string;
    public userName: any;

    constructor(private http: HttpClient, private router: Router, private globals: Globals, private socialAuthService: SocialAuthService) {
        this.URL = globals.server_url + 'users/';
        this.URL_CLIENT = globals.server_url + 'clients/';
    }

    signUp(user) {
        return this.http.post<any>(this.URL_CLIENT + 'signUp', user);
    }

    signIn(user) {
        return this.http.post<any>(this.URL + 'signIn', user);
    }

    login() {
        return this.http.get(this.URL + 'auth/google');
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


    signOut() {
        this.socialAuthService.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImg');
        this.router.navigate(['/']);
    }
}
