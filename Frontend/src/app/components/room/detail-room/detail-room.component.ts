import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.interface';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss'],
})
export class DetailRoomComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    private spinnerService: SpinnerService
  ) {}

  roomId: number;
  room: Room;

  ngOnInit() {
    this.spinnerService.showSpinner();
    const idRoom = 200;
    this.roomService.getRoomById(idRoom).subscribe(
      (res) => {
        this.room = res;
        this.spinnerService.hideSpinner();
      },
      (err) => {
        this.spinnerService.hideSpinner();
      }
    );
  }
}
