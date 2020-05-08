import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { RoomService } from 'src/app/services/room.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
    uploader: FileUploader;
    formCreateRoom: FormGroup;
    maxSize = 5 * 1024 * 1024; // 5MB
    allowedFileType = ['image'];
    urls = [];
    images = [];
    public hasBaseDropZoneOver = false;
    hasAnotherDropZoneOver: boolean;
    public errorImages = '';
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
        private cloudinaryService: CloudinaryService,
        private notification: NotificationService
    ) {
        this.title = 'salas';
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

            // Add built-in and custom tags for displaying the uploaded photo in the list
            let tags = 'consultoriosdelparque';
            if (this.title) {
                form.append('context', `photo=${this.title}`);
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
            this.formCreateRoom.controls.images.setErrors({ incorrect: true });
            this.errorImages = '';
            if (fileItem.size > this.maxSize) {
                this.errorImages = 'Se ha excedido el tamaño permitido';
            } else {
                if (!this.allowedFileType.includes(fileItem.type)) {
                    this.errorImages = 'Solamente te puede ingresar imagenes';
                }
            }
        };
        this.uploader.onAfterAddingFile = (fileItem) => {
            this.formCreateRoom.controls.images.reset();
            const url = window.URL
                ? window.URL.createObjectURL(fileItem._file)
                : (window as any).webkitURL.createObjectURL(fileItem._file);
            this.urls.push(url);
            this.files.push(fileItem);
        };
        this.formCreateRoom = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            images: [''],
        });
    }

    create(data) {
        this.spinnerSevice.showSpinner();

        if (this.uploader.queue.length > 0) {
            for (const fileItem of this.uploader.queue) {
                this.uploader.uploadItem(fileItem);
                this.uploader.onCompleteItem = (item, response: any, status) => {
                    const response2 = JSON.parse(response);
                    this.images.push(response2.public_id);
                };
            }

            // }
            this.uploader.onCompleteAll = () => {
                data.images = this.images;
                this.createRoom(data);
            };
        } else {
            if (this.images) {
                data.images = this.images;
            }
            this.createRoom(data);
        }
    }

    createRoom(room) {
        this.roomService.createRoom(room).subscribe(res => {
            this.route.navigate(['/']);
            this.spinnerSevice.hideSpinner();
            this.notification.showSuccess(
                'La sala se ha dado de alta correctamente'
            );
        })
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
