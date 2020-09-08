import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/validators/password.validator';
import Utils from '../../utils/utils';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: Router,
        private spinnerSevice: SpinnerService,
        public sanitizer: DomSanitizer,
        private notification: NotificationService,
        private modalService: ModalService,
    ) {
    }
    get form() {
        return this.formCreateClient.controls;
    }
    formCreateClient: FormGroup;
    maxSize = 1024 * 1024; // 1MB
    allowedFileType = ['image'];
    public errorImagen = '';
    public imagePath;
    imgURL: any = 'assets/images/default.jpg';
    imageSelected = false;

    ngOnInit() {

        this.formCreateClient = this.formBuilder.group(
            {
                name: ['Nomfsdhkjdfkjbre', Validators.required],
                lastName: ['Apelsjddfsdsfido', Validators.required],
                email: ['', [Validators.pattern('^[^@]+@[^@]+\\.[a-zA-Z]{2,}$')]],
                userName: ['userName', Validators.required],
                mobilePhone: ['1234', Validators.required],
                password: ['123', Validators.required],
                passwordConfirm: ['123', Validators.required],
                image: [''],
                fileSource: [''],
            },
            {
                validator: [
                    ConfirmedValidator('password', 'passwordConfirm'),
                ],
            }
        );
    }

    isFieldRequiredUntouched(field: string) {
        return this.formCreateClient.get(field).errors?.required && this.formCreateClient.get(field).untouched;
    } // Esto es lo que aparece al principio antes de que se haya modificado el campo para indicar que es requerido

    isFieldRequired(field: string) {
        return this.formCreateClient.get(field).errors?.required && this.formCreateClient.get(field).touched;
    }

    genericValidation(field: string, validation: string) {
        const error = this.formCreateClient.get(field).errors;
        if (error) {
            return error[validation] && this.formCreateClient.get(field).touched;
        }
        return false;
    }

    displayFieldCss(field: string) {
        return {
            'is-required': this.isFieldRequiredUntouched(field),
        };
    }


    create() {

        const formData = new FormData();
        const userName = this.formCreateClient.get('userName');
        const email = this.formCreateClient.get('email');
        formData.append('name', this.formCreateClient.get('name').value);
        formData.append('lastName', this.formCreateClient.get('lastName').value);
        formData.append('email', email.value);
        formData.append('userName', userName.value);
        formData.append('password', this.formCreateClient.get('password').value);
        formData.append('mobilePhone', this.formCreateClient.get('mobilePhone').value);
        if (this.imageSelected) {
            formData.append('file', this.formCreateClient.get('fileSource').value);
        }

        if (this.formCreateClient.valid) {
            this.spinnerSevice.showSpinner();

            this.authService.signUp(formData).subscribe((res) => {
                this.spinnerSevice.hideSpinner();
                if (Utils.isOkResponse(res)) {
                    this.route.navigate(['/']);
                    this.removeImage();
                    this.formCreateClient.reset();
                    this.modalService.hideModal();
                    this.notification.showSuccess('Se ha registrado satisfactoriamente');

                } else {
                    if (res.data.email) {
                        email.setErrors({ unique: res.data.email });
                        email.markAsTouched();
                    }
                    if (res.data.userName) {
                        userName.setErrors({ unique: res.data.userName });
                        userName.markAsTouched();
                    }
                }
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


}
