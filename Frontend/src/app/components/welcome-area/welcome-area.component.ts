import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-welcome-area',
  templateUrl: './welcome-area.component.html',
  styleUrls: ['./welcome-area.component.css'],
})
export class WelcomeAreaComponent implements AfterViewInit {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  prueba = '/assets/images/test1.jpg';
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 4,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };
  carouselItems = [
    '/assets/images/test1.jpg',
    '/assets/images/test2.jpg',
    '/assets/images/test3.jpg',
    '/assets/images/test3.jpg',
  ];
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
