import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor() { } 

    showSuccess(message) {
        alertify.success(message);
    }

    showError(message) {
        alertify.error(message);
    }
    showInfo(message) {
        alertify.notify(message);
    }
    showWarning(message) {
        alertify.warning(message);
    }

    showMessage(message) {
        alertify.message(message);
    }
}
