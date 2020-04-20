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
  constructor(
    private roomService: RoomService,
    private spinnerService: SpinnerService,
    private hoursSerice: HoursService,
    public authService: AuthService
  ) {}
 
  ngOnInit() {
    //this.spinnerService.showSpinner();
    this.roomService.getRooms().subscribe((res) => {
      this.rooms = res;
      this.hours = this.hoursSerice.list_hours; 
    //  this.spinnerService.hideSpinner();
    });
    
  }

}
