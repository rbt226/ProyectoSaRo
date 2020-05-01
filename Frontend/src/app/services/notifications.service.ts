import { Injectable } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import alertify from 'alertify.js';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toaster: Toaster) {}

  showAlertify(message) {
    alertify.error(message);
  }
  showAlertifySuccess(message) {
    alertify.success(message);
  }

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
