import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Utils from '../../../utils/utils';
import { FeatureService } from 'src/app/services/feature.service';


@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
    formCreateRoom: FormGroup;
    maxSize = 5 * 1024 * 1024; // 5MB
    allowedFileType = ['image/jpg'];
    public errorImagen = '';
    imgURL: any = 'assets/images/default.jpg';
    maxImages = 5;
    urls = [];
    files = [];
    uniqueNameError;
    features = [];
    roomsFeatures = [];

    constructor(
        private roomService: RoomService,
        private formBuilder: FormBuilder,
        private route: Router,
        private spinnerSevice: SpinnerService,
        public sanitizer: DomSanitizer,
        private notification: NotificationService,
        private featureService: FeatureService,

    ) {
    }
    ngOnInit() {
        this.formCreateRoom = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            images: ['', Validators.required],
        });
        this.featureService.getFeatures().subscribe(
            (res) => {
                this.features = res.data;
            })
    }


    resetNameError() {
        this.uniqueNameError = false;
    }

    create() {
        const formData = new FormData();
        const name = this.formCreateRoom.get('name');

        formData.append('name', name.value);
        const features = this.roomsFeatures.map((f) => {
            return f.id_feature;

        });
        formData.append('features', JSON.stringify(features));

        formData.append('description', this.formCreateRoom.get('description').value);
        for (const fileImage of this.files) {
            formData.append('file', fileImage);
        }
        if (this.formCreateRoom.valid) {
            this.spinnerSevice.showSpinner();
            this.roomService.createRoom(formData).subscribe(res => {
                this.spinnerSevice.hideSpinner();
                if (Utils.isOkResponse(res)) {
                    this.route.navigate(['/']);
                    this.notification.showSuccess(
                        'El consultorio se ha dado de alta correctamente'
                    );
                } else {
                    name.setErrors({ unique: res.message });
                    name.markAsTouched();
                }
            });
        } else {
            this.formCreateRoom.markAllAsTouched();
        }
    }

    isFieldRequiredUntouched(field: string) {
        return this.formCreateRoom.get(field).errors?.required && this.formCreateRoom.get(field).untouched;
    } // Esto es lo que aparece al principio antes de que se haya modificado el campo para indicar que es requerido

    isFieldRequired(field: string) {
        return this.formCreateRoom.get(field).errors?.required && this.formCreateRoom.get(field).touched;
    }

    genericValidation(field: string, validation: string) {
        const error = this.formCreateRoom.get(field).errors;
        if (error) {
            return error[validation] && this.formCreateRoom.get(field).touched;
        }
        return false;
    }

    displayFieldCss(field: string) {
        return {
            'is-required': this.isFieldRequiredUntouched(field),
        };
    }

    get form() {
        return this.formCreateRoom.controls;
    }

    preview(event) {
        this.errorImagen = null;

        if (event.target.files.length === 0) {
            return;
        }

        if (this.urls.length >= this.maxImages) {
            this.errorImagen = 'Ha superado el máximo de imagenes permitidas';
            return;
        }

        const mimeType = event.target.files[0].type;
        const size = event.target.files[0].size;

        if (size > this.maxSize) {
            this.errorImagen = 'Se excede el máximo permitido';
            return;
        }

        if (mimeType !== 'image/jpeg' && mimeType !== 'image/jpg' && mimeType !== 'image/png') {
            this.errorImagen = 'Solo se soportan imagenes del tipo png o jpg, jpeg';
            return;
        }


        const files = event.target.files;
        for (const fileImage of files) {
            const reader = new FileReader();

            reader.onload = () => {
                if (this.urls.length >= this.maxImages) {
                    this.errorImagen = 'Ha superado el máximo de imagenes permitidas';
                    return;
                }
                this.urls.push(reader.result);
                this.files.push(fileImage);
            };
            reader.readAsDataURL(fileImage);
        }

    }

    removeImage(url) {
        const index = this.urls.indexOf(url);
        if (index > -1) {
            this.urls.splice(index, 1);
            this.files.splice(index, 1);

        }
    }
}
