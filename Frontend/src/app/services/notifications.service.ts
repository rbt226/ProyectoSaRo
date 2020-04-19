import { Injectable } from '@angular/core';
import { Toaster, ToastType } from 'ngx-toast-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toaster: Toaster) {}

  showSuccess(message, title) {
    this.toaster.open({
      text: message,
      caption: title,
      type: 'success',
    });
  }

  showError(message, title) {
    this.toaster.open({
      text: message,
      caption: title,
      type: 'danger',
    });
  }

  showInfo(message, title) {
    this.toaster.open({
      text: message,
      caption: title,
      type: 'info',
    });
  }

  showWarning(message, title) {
    this.toaster.open({
      text: message,
      caption: title,
      type: 'warning',
    });
  }
}
