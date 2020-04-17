import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

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

  private hasBaseDropZoneOver: boolean = false;
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
        this.cloudinary.config().djbmfd9y6
      }/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
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

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
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
    console.log(this.image);
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

  onImageSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0] as File;
      // chequea que aunque sea haya un archivo
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.image);
    }
  }
}
