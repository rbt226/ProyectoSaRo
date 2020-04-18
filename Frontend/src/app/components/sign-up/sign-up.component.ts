import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Cloudinary } from '@cloudinary/angular-5.x';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget; // esto es para que haga un autocompletado
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver = false;
  public uploader: FileUploader;
  private title: string;

  constructor(
    private autService: AuthService,
    private formBuilder: FormBuilder,
    private cloudinary: Cloudinary
  ) {}
  image: File;
  imageSelected: string | ArrayBuffer;

  formSignUp: FormGroup;

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
    ) => {
      console.log('entre aca?');
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
    };

    this.formSignUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      image: [''],
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  signUp(data) {
    console.log(data.value);
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
