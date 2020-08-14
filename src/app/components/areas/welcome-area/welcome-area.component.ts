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
  styleUrls: ['./welcome-area.component.scss'],
})
export class WelcomeAreaComponent implements AfterViewInit {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  @ViewChild('welcomeCarousel') welcomeCarousel: NguCarousel<any>;
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
    '/assets/images/test1.jpeg',
    '/assets/images/test2.jpeg',
    '/assets/images/test3.jpeg',
    '/assets/images/test4.jpeg',
  ];
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.welcomeCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.welcomeCarousel.moveTo(slide, !this.withAnim);
  }
}