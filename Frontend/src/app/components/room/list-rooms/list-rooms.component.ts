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
import * as AnimatePlugin from 'src/assets/javascript/animate-plus'
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss'],
})
export class ListRoomsComponent implements OnInit, AfterViewInit {
  rooms = [];
  name = 'Angular';
  withAnim = true;
  resetAnim = true;

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 4,
    interval: { timing: 20000, initialDelay: 1000 },
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
    private cdr: ChangeDetectorRef,
    private app: AppComponent
  ) {}

  ngShow(type, data) {
    this.app.show(type, data);
  }  

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  resetAnimation() {
    AnimatePlugin.reset();
  }

  ngOnInit() {
    this.spinnerService.showSpinner();

    this.roomService.getRooms().subscribe(
      (res) => {
        this.spinnerService.hideSpinner();
        this.rooms = res;
      },
      () => {},
      () => {
        this.cdr.detectChanges();
        AnimatePlugin.constructor();
      }
    );
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }
}
