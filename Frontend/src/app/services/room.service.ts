import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Room } from '../models/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private URL = 'http://localhost:3300/rooms/';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getRooms() {
    return this.http.get<Room[]>(this.URL);
  }

  getRoomById(idRoom) {
    return this.http.get<any>(this.URL + idRoom);
  }

  createRoom(room) {
    return this.http.post<any>(this.URL, room);
  }
}
