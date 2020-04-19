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
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  uploader: FileUploader;
  formCreateRoom: FormGroup;
  maxSize = 10000;
  allowedFileType = ['image'];
  public hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver: boolean;
  public errorImage = '';
  private title: string;
  private publicId: string;

  public imageDataArray;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary,
    private route: Router,
    private spinnerSevice: SpinnerService
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
      status: number,
      headers: ParsedResponseHeaders
    ) =>
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

    this.uploader.onWhenAddingFileFailed = (fileItem: any) => {
      this.formCreateRoom.controls.image.setErrors({ incorrect: true });
      this.errorImage = '';
      if (fileItem.size > this.maxSize) {
        this.errorImage = 'Se ha excedido el tamaño permitido';
      } else {
        if (!this.allowedFileType.includes(fileItem.type)) {
          this.errorImage = 'Solamente te puede ingresar imagenes';
        }
      }
    };
    this.uploader.onAfterAddingFile = () => {
      this.formCreateRoom.controls.image.reset();
    };
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
    this.spinnerSevice.showSpinner();

    if (this.uploader.queue.length > 0) {
      for (const fileItem of this.uploader.queue) {
        this.uploader.uploadItem(fileItem);
        this.uploader.onCompleteItem = (
          item: any,
          response: any,
          status: any,
          headers: any
        ) => {
          this.publicId = JSON.parse(response).public_id;
          data.image = this.publicId;
          this.roomService.createRoom(data).subscribe((res) => {
            this.route.navigate(['/rooms']);
            this.spinnerSevice.hideSpinner();
          });
        };
      }
    } else {
      if (this.publicId) {
        data.image = this.publicId;
      }
      this.roomService.createRoom(data).subscribe((res) => {
        this.route.navigate(['/rooms']);
        this.spinnerSevice.hideSpinner();
      });
    }
  }
}
