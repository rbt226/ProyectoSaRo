import { Component } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome-area',
  templateUrl: './welcome-area.component.html',
  styleUrls: ['./welcome-area.component.css'],
})
export class WelcomeAreaComponent {
  images = [
    '/assets/images/test1.jpg',
    '/assets/images/test2.jpg',
    '/assets/images/test3.jpg',
  ];

  // Images = ['../assets/images/1.jpg', '../assets/images/2.jpg', '../assets/images/3.jpg'];
}
