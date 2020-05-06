import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinnerSevice: SpinnerService,
    private emailService: EmailService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.formContact = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  send(data) {
    console.log('data --> ', data);
    this.spinnerSevice.showSpinner();
    this.emailService
      .sendEmail({
        mail: data.email,
        name: data.name,
        msg: data.message,
      }).subscribe((res) => {
        this.notification.showSuccess(
                        'El mensaje ha sido enviado'
                    );       
        this.formContact.reset();
        this.spinnerSevice.hideSpinner();
      });
    this.spinnerSevice.hideSpinner();
  }
}
