import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
    formCreateRoom: FormGroup;
    maxSize = 5 * 1024 * 1024; // 5MB
    allowedFileType = ['image'];
    public errorImagen = '';
    imgURL: any = 'assets/images/default.jpg';
    maxImages = 5;
    urls = [];
    files = [];
    uniqueNameError;

    constructor(
        private roomService: RoomService,
        private formBuilder: FormBuilder,
        private route: Router,
        private spinnerSevice: SpinnerService,
        public sanitizer: DomSanitizer,
        private notification: NotificationService
    ) {
    }
    ngOnInit() {
        this.formCreateRoom = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            images: ['', Validators.required],
        });
    }


    resetNameError() {
        this.uniqueNameError = false;
    }

    create() {
        const formData = new FormData();
        formData.append('name', this.formCreateRoom.get('name').value);
        formData.append('description', this.formCreateRoom.get('description').value);
        for (const fileImage of this.files) {
            formData.append('file', fileImage);
        }
        this.uniqueNameError = false;

        if (this.formCreateRoom.valid) {
            this.spinnerSevice.showSpinner();
            this.roomService.createRoom(formData).subscribe(res => {
                this.spinnerSevice.hideSpinner();
                if (res.error) {
                    this.uniqueNameError = true;

                } else {
                    this.route.navigate(['/']);
                    this.notification.showSuccess(
                        'La sala se ha dado de alta correctamente'
                    );
                }
            });
        } else {
            this.formCreateRoom.markAllAsTouched();
        }

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
            console.log('Ha superado el máximo de imagenes permitidas');
            return;
        }

        const mimeType = event.target.files[0].type;
        const size = event.target.files[0].size;

        if (size > this.maxSize) {
            this.errorImagen = 'Se excede el máximo permitido';
            console.log('Se excede el máximo permitido');
            return;
        }
        if (mimeType.match(/image\/*/) == null) {
            console.log('Solo se soportan imagenes');
            this.errorImagen = 'Solo se soportan imagenes.';
            return;
        }


        const files = event.target.files;
        for (const fileImage of files) {
            const reader = new FileReader();

            reader.onload = () => {
                if (this.urls.length >= this.maxImages) {
                    this.errorImagen = 'Ha superado el máximo de imagenes permitidas';
                    console.log('Ha superado el máximo de imagenes permitidas');
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
        }
    }
}
