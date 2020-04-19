import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss'],
})
export class ListRoomsComponent implements OnInit {
  rooms = [];
  constructor(
    private roomService: RoomService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.roomService.getRooms().subscribe((res) => {
      this.rooms = res;
      this.spinnerService.hideSpinner();
    });
  }
}
