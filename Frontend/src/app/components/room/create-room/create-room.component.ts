import { Component, OnInit } from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  uploader: FileUploader;
  response: string;
  formCreateRoom: FormGroup;

  public hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver: boolean;

  private title: string;
  public imageDataArray;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary
  ) {
    this.title = '';
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
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
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
        console.log(fileItem);
        return false;
      }
    };

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add built-in and custom tags for displaying the uploaded photo in the list
      let tags = 'angularimagegallery';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `angularimagegallery,${this.title}`;
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
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      console.log('on compleyr ', JSON.stringify(response));
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
    };

    this.formCreateRoom = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  create(data) {
    console.log(data);
    this.uploader.uploadAll();

    // Update model on completion of uploading a file
    // this.autService.signUp(data).subscribe(
    //   (res) => {
    //     localStorage.setItem('token', res.token);
    //     console.log('resss', res.token);
    //   },
    //   (err) => {
    //     console.log('Error', err);
    //   }
    // );
  }
}
