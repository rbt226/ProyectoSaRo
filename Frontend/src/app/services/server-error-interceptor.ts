import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                this.spinnerService.hideSpinner();
                if (error.status === 401) {
                    localStorage.removeItem('token');
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
