import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room.interface';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.scss'],
})
export class DetailRoomComponent implements OnInit, AfterViewInit {
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  roomId: number;
  room: Room;
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 4,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    point: {
      visible: true,
      hideOnSingleSlide: true,
    },
  };

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

  ngOnInit() {
    this.spinner.show();
    const idRoom = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(idRoom).subscribe((res) => {
      this.room = res;
      this.spinner.hide();
    });
  }
}
