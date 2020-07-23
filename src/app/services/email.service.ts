import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private URL = 'http://localhost:3300/email/';

  constructor(private http: HttpClient) {}

  sendEmail(email) {
    return this.http.post<any>(this.URL, email);
  }
}
