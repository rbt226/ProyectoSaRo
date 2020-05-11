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

    // images = [];
    // public errorImages = '';
    // files: FileItem[] = [];


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
            images: [''],
        });
    }

    create() {
        const formData = new FormData();
        formData.append('name', this.formCreateRoom.get('name').value);
        formData.append('description', this.formCreateRoom.get('lastName').value);
        formData.append('file', this.formCreateRoom.get('fileSource').value);

        if (this.formCreateRoom.valid) {
            this.spinnerSevice.showSpinner();
            this.roomService.createRoom(formData).subscribe(res => {
                this.route.navigate(['/']);
                this.spinnerSevice.hideSpinner();
                this.notification.showSuccess(
                    'La sala se ha dado de alta correctamente'
                );
            });
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
            this.errorImagen = 'Ha superado el maximo de imagenes permitidas';
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
            console.log('\'Solo se soportan imagenes.\'');
            this.errorImagen = 'Solo se soportan imagenes.';
            return;
        }


        const files = event.target.files;
        for (const fileImage of files) {
            const reader = new FileReader();

            reader.onload = () => {
                console.log('this.urls.length ', this.urls.length);
                if (this.urls.length >= this.maxImages) {
                    this.errorImagen = 'Ha superado el maximo de imagenes permitidas';
                    return;
                }
                this.urls.push(reader.result);
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

    // removeImage(url) {
    //     const index = this.urls.indexOf(url);
    //     if (index > -1) {
    //         this.urls.splice(index, 1);
    //         this.uploader.removeFromQueue(this.files[index]);
    //         this.files.splice(index, 1);
    //     }
    // }
}
