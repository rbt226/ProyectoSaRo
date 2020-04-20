import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-welcome-area',
  templateUrl: './welcome-area.component.html',
  styleUrls: ['./welcome-area.component.css'],
})
export class WelcomeAreaComponent {
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
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
  images = [
    '/assets/images/test1.jpg',
    '/assets/images/test2.jpg',
    '/assets/images/test3.jpg',
    '/assets/images/test3.jpg',
  ];
  constructor(private cdr: ChangeDetectorRef) {}

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
