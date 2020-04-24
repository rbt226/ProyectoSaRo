import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HoursService } from 'src/app/services/Hours.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking-area',
  templateUrl: './booking-area.component.html',
  styleUrls: ['./booking-area.component.css']
})
export class BookingAreaComponent implements OnInit {

    rooms = [];
    hours = [];
    today: string;

  constructor(
    private roomService: RoomService,
    private spinnerService: SpinnerService,
    private hoursSerice: HoursService,
    public authService: AuthService
  ) {}
  
  ngOnInit() {
      this.hours = this.hoursSerice.list_hours; 
      this.today = new Date().toISOString().split('T')[0];
      this.roomService.getRooms().subscribe((res) => {
      this.rooms = res;    
    });    
  }
}

