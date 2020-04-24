import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public authService: AuthService, private app: AppComponent) {}

   ngShow() {
    this.app.show();
    }  

  public isMenuCollapsed = true;
}
