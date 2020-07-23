import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL = 'https://consultorios-del-parque-server.herokuapp.com/users';

    constructor(private http: HttpClient) { }
    getUsers() {
        return this.http.get<Array<User>>(this.URL);
    }

    signUp(user) {
        return this.http.post<any>(this.URL + '/signUp', user);
    }

    setUserData(userName, imageUser) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userImg', imageUser);
    }

    getUserByEmail(user) {
        return this.http.post<any>(this.URL + '/byEmail', user);
    }
}
