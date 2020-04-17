import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://localhost:3300';

  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<Array<User>>(this.URL + '/users');
  }
}
