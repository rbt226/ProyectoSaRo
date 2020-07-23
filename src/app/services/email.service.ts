import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private URL = 'https://consultorios-del-parque-server.herokuapp.com/email/';

  constructor(private http: HttpClient) { }

  sendEmail(email) {
    return this.http.post<any>(this.URL, email);
  }
}
