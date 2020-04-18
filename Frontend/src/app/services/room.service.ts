import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private URL = 'http://localhost:3300/rooms';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<any>(this.URL);
  }

  getRoomById(idRoom) {
    console.log('id Room ', idRoom);
    return this.http.get<any>(this.URL + idRoom);
  }

  createRoom(room) {
    console.log(' Room ', room);
    return this.http.post<any>(this.URL, room);
  }
}
