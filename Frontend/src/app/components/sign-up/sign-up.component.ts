import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator, DocumentValidator } from 'src/app/validators/password.validator';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    formCreateClient: FormGroup;
    maxSize = 1024 * 1024; // 1MB
    allowedFileType = ['image'];
    public errorImagen = '';
    public imagePath;
    imgURL: any = 'assets/images/default.jpg';
    imageSelected = false;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private route: Router,
        private spinnerSevice: SpinnerService,
        public sanitizer: DomSanitizer,
        private notification: NotificationService,
        private modalService: ModalService,
    ) {
    }
    ngOnInit() {
        this.formCreateClient = this.formBuilder.group(
            {
                name: ['', Validators.required],
                lastName: ['', Validators.required],
                document: [''],
                email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),],],
                userName: ['', Validators.required],
                mobilePhone: ['', Validators.required],
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required],
                documentType: ['CI'],
                image: [''],
                fileSource: [''],
            },
            {
                validator: [
                    ConfirmedValidator('password', 'passwordConfirm'),
                    DocumentValidator('documentType', 'document'),
                ],
            }
        );
        this.formCreateClient.reset();
    }

    get form() {
        return this.formCreateClient.controls;
    }

    create() {
        const formData = new FormData();
        formData.append('name', this.formCreateClient.get('name').value);
        formData.append('lastName', this.formCreateClient.get('lastName').value);
        formData.append('email', this.formCreateClient.get('email').value);
        formData.append('document', this.formCreateClient.get('document').value);
        formData.append('userName', this.formCreateClient.get('userName').value);
        formData.append('password', this.formCreateClient.get('password').value);
        formData.append('mobilePhone', this.formCreateClient.get('mobilePhone').value);
        if (this.imageSelected) {
            formData.append('file', this.formCreateClient.get('fileSource').value);
        }

        if (this.formCreateClient.valid) {
            this.spinnerSevice.showSpinner();
            this.userService.signUp(formData).subscribe((res) => {
                this.route.navigate(['/']);
                this.spinnerSevice.hideSpinner();
                this.removeImage();
                this.formCreateClient.reset();
                this.modalService.hideModal();
                this.notification.showSuccess('Se ha registrado satisfactoriamente');
            });
        } else {
            this.formCreateClient.markAllAsTouched();
        }
    }

    preview(event) {
        if (event.target.files.length === 0) {
            return;
        }
        this.imageSelected = true;

        const mimeType = event.target.files[0].type;
        const size = event.target.files[0].size;

        if (size > this.maxSize) {
            this.errorImagen = 'Se excede el máximo permitido';
            return;
        }
        if (mimeType.match(/image\/*/) == null) {
            this.errorImagen = 'Only images are supported.';
            return;
        }

        const reader = new FileReader();
        this.imagePath = event.target.files;
        const file = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        this.formCreateClient.patchValue({
            fileSource: file

        });
        reader.onload = () => {
            this.imgURL = reader.result;
        };
    }

    removeImage() {
        this.imgURL = 'assets/images/default.jpg';
        this.imagePath = null;
        this.imageSelected = false;
    }

    changeDocument() {
        this.formCreateClient.controls.document.setValue('');
        this.formCreateClient.controls.document.markAsUntouched();
    }
}
