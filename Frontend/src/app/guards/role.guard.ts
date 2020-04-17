import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    // const user = this.authService.decode();

    // if (user.Role === next.data.role) {
    //   return true;
    // }

    // // navigate to not found page
    // this.router.navigate(['/404']);
    // return false;
    return true;
  }
}
