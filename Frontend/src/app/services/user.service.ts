import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL = 'http://localhost:3300/users';

    constructor(private http: HttpClient) { }
    getUsers() {
        return this.http.get<Array<User>>(this.URL);
    }

    signUp(user) {
        return this.http.post<any>(this.URL + '/signUp', user);
    }

}
