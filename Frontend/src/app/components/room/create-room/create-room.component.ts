import { Component, OnInit } from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  uploader: FileUploader;
  response: any;
  formCreateRoom: FormGroup;

  public hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver: boolean;

  private title: string;
  public imageDataArray;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary,
    private route: Router
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
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

    this.response = '';

    this.uploader.response.subscribe((res) => (this.response = res));

    this.formCreateRoom = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  create(data) {
    console.log(data);
    data.image = this.response.id;
    for (const fileItem of this.uploader.queue) {
      this.uploader.uploadItem(fileItem);
      this.uploader.onCompleteItem = (
        item: any,
        response: any,
        status: any,
        headers: any
      ) => {
        const publicId = JSON.parse(response).public_id;
        data.image = publicId;


        this.roomService.createRoom(data).subscribe(
          (res) => {
            console.log('resss', res);
            this.route.navigate(['/rooms']);
          },
          (err) => {
            console.log('Error', err);
          }
        );
      };
    }


  }
}
