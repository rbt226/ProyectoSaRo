import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private URL = 'https://consultorios-del-parque-server.herokuapp.com/users';
    public userName: any;

    constructor(private http: HttpClient, private router: Router, private usrService: UserService) { }

    signUp(user) {
        return this.http.post<any>(this.URL + '/signUp', user);
    }

    signIn(user) {
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
