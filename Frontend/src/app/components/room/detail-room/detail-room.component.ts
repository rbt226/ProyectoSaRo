import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.interface';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss'],
})
export class DetailRoomComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  roomId: number;
  room: Room;

  ngOnInit() {
    this.spinner.show();
    const idRoom = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(idRoom).subscribe((res) => {
      this.room = res;
      this.spinner.hide();
    });
  }
}
