import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private URL: string;

  constructor(private http: HttpClient, private globals: Globals) {
    this.URL = globals.server_url + 'email/';
  }

  sendEmail(email) {
    return this.http.post<any>(this.URL, email);
  }
}
