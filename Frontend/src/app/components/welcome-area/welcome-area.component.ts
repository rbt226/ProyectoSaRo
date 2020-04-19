import { Component } from '@angular/core';

@Component({
  selector: 'welcome-area',
  templateUrl: './welcome-area.component.html',
  styleUrls: ['./welcome-area.component.css']
})
export class WelcomeAreaComponent {
  // Images = ['../assets/images/1.jpg', '../assets/images/2.jpg', '../assets/images/3.jpg'];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
}
