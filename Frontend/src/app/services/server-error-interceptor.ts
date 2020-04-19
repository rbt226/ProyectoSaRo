import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hideSpinner();
        console.log('apago?');
        if (error.status === 401) {
          localStorage.removeItem('token');
        } else {
          console.log('entro a HttpInterceptor?');
          return throwError(error);
        }
      })
    );
  }
}
