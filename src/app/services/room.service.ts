import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room.interface';
import { Globals } from '../globals';

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	private URL: string;

	constructor(private http: HttpClient, private globals: Globals) {
		this.URL = globals.server_url + 'rooms/';
	}
	getRooms() {
		return this.http.get<any>(this.URL);
	}

	getRoomById(idRoom) {
		return this.http.get<any>(this.URL + idRoom);
	}

	createRoom(room) {
		return this.http.post<any>(this.URL, room);
	}
}
