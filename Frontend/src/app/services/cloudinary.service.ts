
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Injectable({
    providedIn: 'root',
})
export class CloudinaryService {

    constructor(private http: HttpClient, private cloudinary: Cloudinary,
    ) {
    }


    private upsertResponse = (fileItem) => {
        // Check if HTTP request was successful
        if (fileItem.status !== 200) {
            return false;
        }
    }

    getUploader(allowedFileType, maxSize, title) {
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${
                this.cloudinary.config().cloud_name
                }/image/upload`,
            autoUpload: false,
            isHTML5: true,
            removeAfterUpload: true,
            allowedFileType,
            maxFileSize: maxSize,
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest',
                },
            ],
        };
        const uploader = new FileUploader(uploaderOptions);

        uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', this.cloudinary.config().upload_preset);

            // Add built-in and custom tags for displaying the uploaded imagen in the list
            let tags = 'consultoriosdelparque';
            if (title) {
                form.append('context', `imagen=${title}`);
                tags = `consultoriosdelparque,${title}`;
            }
            form.append('tags', tags);
            form.append('file', fileItem);

            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return { fileItem, form };
        };

        // Update model on completion of uploading a file
        uploader.onCompleteItem = (
            item: any,
            response: string,
            status: number
        ) =>
            this.upsertResponse({
                file: item.file,
                status,
                data: JSON.parse(response),
            });



        return uploader;


    }




}
