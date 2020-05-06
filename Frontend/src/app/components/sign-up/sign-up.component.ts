import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
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
    uploader: FileUploader;
    formCreateClient: FormGroup;
    maxSize = 1024 * 1024; // 1MB
    allowedFileType = ['image'];
    photo = 'assets/images/default.jpg';
    defaultPhoto = true;
    imagen = [];
    public hasBaseDropZoneOver = false;
    hasAnotherDropZoneOver: boolean;
    public errorImagen = '';
    private title: string;
    public imageDataArray;
    file: FileItem = null;

    constructor(
        private userService: UserService,
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
            this.formCreateClient.controls.image.reset();
            const url = window.URL
                ? window.URL.createObjectURL(fileItem._file)
                : (window as any).webkitURL.createObjectURL(fileItem._file);
            debugger;
            this.photo = url;
            this.file = fileItem;
            if (this.uploader.queue.length > 1) {
                this.uploader.queue.splice(0, 1); // clear old file & replace it with the new one
            }
        };
        this.formCreateClient = this.formBuilder.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            document: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            userName: ['', Validators.required],
            mobilePhone: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            documentType: ['CI', Validators.required],
            image: [''],
        }, {
            validator: [ConfirmedValidator('password', 'passwordConfirm'), DocumentValidator('documentType', 'document')]
        });
    }

    get f() {
        return this.formCreateClient.controls;
    }
    create(data) {
        this.spinnerSevice.showSpinner();
        debugger;
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

                this.userService.signUp(data).subscribe((res) => {
                    debugger;
                    this.route.navigate(['/']);
                    this.spinnerSevice.hideSpinner();
                    this.notification.showSuccess(
                        'Se ha registrado satisfactoriamente'
                    );
                });
            };
        } else {
            if (this.imagen.length > 0) {
                data.image = this.imagen;
            }
            this.userService.signUp(data).subscribe((res) => {
                debugger;
                this.route.navigate(['/']);
                this.spinnerSevice.hideSpinner();
                this.notification.showSuccess(
                    'Se ha registrado satisfactoriamente'
                );
            });
        }
    }

    removeImage() {
        debugger;
        this.photo = 'assets/images/default.jpg';
        this.uploader.removeFromQueue(this.file);
        this.file = null;
    }

    changeDocument() {
        this.formCreateClient.controls.document.setValue('');
        this.formCreateClient.controls.document.markAsUntouched();

    }
}
