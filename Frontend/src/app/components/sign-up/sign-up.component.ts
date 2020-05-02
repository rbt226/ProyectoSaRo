import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FileUploader, FileUploaderOptions, FileItem } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    uploader: FileUploader;
    formCreateClient: FormGroup;
    maxSize = 1024 * 1024; // 1MB
    allowedFileType = ['image'];
    urls = [];
    imagen = [];
    public hasBaseDropZoneOver = false;
    hasAnotherDropZoneOver: boolean;
    public errorImagen = '';
    private title: string;
    public imageDataArray;
    files: FileItem[] = [];

    constructor(
        private roomService: RoomService,
        private formBuilder: FormBuilder,
        private cloudinary: Cloudinary,
        private route: Router,
        private spinnerSevice: SpinnerService,
        public sanitizer: DomSanitizer,
        private notification: NotificationService
    ) {
        this.title = 'clientes';
    }
    ngOnInit() {
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${
                this.cloudinary.config().cloud_name
                }/image/upload`,
            // Upload files automatically upon addition to upload queue
            autoUpload: false,
            // Use xhrTransport in favor of iframeTransport
            isHTML5: true,
            // Calculate progress independently for each uploaded file
            removeAfterUpload: true,
            allowedFileType: this.allowedFileType,
            maxFileSize: this.maxSize,
            // XHR request headers
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest',
                },
            ],
        };

        const upsertResponse = (fileItem) => {
            // Check if HTTP request was successful
            if (fileItem.status !== 200) {
                return false;
            }
        };

        this.uploader = new FileUploader(uploaderOptions);
        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', this.cloudinary.config().upload_preset);

            // Add built-in and custom tags for displaying the uploaded imagen in the list
            let tags = 'consultoriosdelparque';
            if (this.title) {
                form.append('context', `imagen=${this.title}`);
                tags = `consultoriosdelparque,${this.title}`;
            }
            form.append('tags', tags);
            form.append('file', fileItem);

            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return { fileItem, form };
        };

        // Update model on completion of uploading a file
        this.uploader.onCompleteItem = (
            item: any,
            response: string,
            status: number
        ) =>
            upsertResponse({
                file: item.file,
                status,
                data: JSON.parse(response),
            });

        this.uploader.onWhenAddingFileFailed = (fileItem: any) => {
            this.formCreateClient.controls.imagen.setErrors({ incorrect: true });
            this.errorImagen = '';
            if (fileItem.size > this.maxSize) {
                this.errorImagen = 'Se ha excedido el tamaño permitido';
            } else {
                if (!this.allowedFileType.includes(fileItem.type)) {
                    this.errorImagen = 'Solamente te puede ingresar imagenes';
                }
            }
        };
        this.uploader.onAfterAddingFile = (fileItem) => {
            this.formCreateClient.controls.imagen.reset();
            const url = window.URL
                ? window.URL.createObjectURL(fileItem._file)
                : (window as any).webkitURL.createObjectURL(fileItem._file);
            this.urls.push(url);
            this.files.push(fileItem);
        };
        this.formCreateClient = this.formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            document: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            userName: ['', Validators.required],
            mobilePhone: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
            imagen: ['defaultUser'],
        });
    }

    create(data) {
        this.spinnerSevice.showSpinner();

        if (this.uploader.queue.length > 0) {
            for (const fileItem of this.uploader.queue) {
                this.uploader.uploadItem(fileItem);
                this.uploader.onCompleteItem = (item, response: any, status) => {
                    const response2 = JSON.parse(response);
                    this.imagen.push(response2.public_id);
                };
            }

            // }
            this.uploader.onCompleteAll = () => {
                data.image = this.imagen;
                this.roomService.createRoom(data).subscribe((res) => {
                    this.route.navigate(['/']);
                    this.spinnerSevice.hideSpinner();
                    this.notification.showSuccess(
                        'Se ha registrado satisfactoriamente'
                    );
                });
            };
        } else {
            if (this.imagen) {
                data.image = this.imagen;
            }
            this.roomService.createRoom(data).subscribe((res) => {
                this.route.navigate(['/']);
                this.spinnerSevice.hideSpinner();
                this.notification.showSuccess(
                    'Se ha registrado satisfactoriamente'
                );
            });
        }
    }

    removeImage(url) {
        const index = this.urls.indexOf(url);
        if (index > -1) {
            this.urls.splice(index, 1);
            this.uploader.removeFromQueue(this.files[index]);
            this.files.splice(index, 1);
        }
    }
}
