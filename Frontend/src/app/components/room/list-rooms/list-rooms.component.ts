import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss'],
})
export class ListRoomsComponent implements OnInit, AfterViewInit {
  rooms = [];
  name = 'Angular';
  slideNo: number = 0;
  withAnim = true;
  resetAnim = true;
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 4,
    interval: { timing: 12000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    point: {
      visible: true,
      hideOnSingleSlide: true,
    },
  };

  slidenro = 0;

  constructor(
    private roomService: RoomService,
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.roomService.getRooms().subscribe((res) => {
      this.rooms = res;
      this.spinnerService.hideSpinner();
    });
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }
}
