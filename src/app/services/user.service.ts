import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Globals } from '../globals';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL: string;

    constructor(private http: HttpClient, private globals: Globals) {
        this.URL = globals.server_url + 'users/';
    }

    getUsers() {
        return this.http.get<Array<User>>(this.URL);
    }

    signUp(user) {
        return this.http.post<any>(this.URL + 'signUp', user);
    }

    setUserData(userName, imageUser) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userImg', imageUser);
    }

    getUserByEmail(user) {
        return this.http.post<any>(this.URL + 'byEmail', user);
    }
}
