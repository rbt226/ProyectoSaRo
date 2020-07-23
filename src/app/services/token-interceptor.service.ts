import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // intercept(
  //   req: import('@angular/common/http').HttpRequest<any>,
  //   next: import('@angular/common/http').HttpHandler
  // ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
  //   throw new Error('Method not implemented.');
  // }

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`, // Añade una cabecera
      },
    });
    return next.handle(tokenizeReq);
  }
}
