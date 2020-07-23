import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    getClientMessage(e: Error): string {
        if (!navigator.onLine) {
            return 'Porfavor verifique su conexión a internet';
        }
        return e.message ? e.message : e.toString();
    }

    getClientStack(e: Error): string {
        return e.stack;
    }

    getServerMessage(e: HttpErrorResponse): string {
        if (!e.error.message) {
            return 'Error de conexión';
        }
        return e.error.message;
    }

    getServerStack(e: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}
