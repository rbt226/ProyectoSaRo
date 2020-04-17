import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private URL = 'http://localhost:3300';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<any>(this.URL + '/rooms');
  }

  getRoomById(idRoom) {
    console.log('id Room ', idRoom);
    return this.http.get<any>(this.URL + '/rooms/' + idRoom);
  }
}
