import { Component, OnInit } from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public imageDataArray;

  constructor(private cloudinary: Cloudinary) {
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
        console.log('Upload to cloudinary Failed');
        return false;
      }
    };

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'consultoriosDelParque';
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
      status: number,
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  
}
