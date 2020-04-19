import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(public spinner: NgxSpinnerService) {}
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }
}
