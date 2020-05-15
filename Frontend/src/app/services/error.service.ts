import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    getClientMessage(e: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return e.message ? e.message : e.toString();
    }

    getClientStack(e: Error): string {
        return e.stack;
    }

    getServerMessage(e: HttpErrorResponse): string {
        return e.error.message;
    }

    getServerStack(e: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}
