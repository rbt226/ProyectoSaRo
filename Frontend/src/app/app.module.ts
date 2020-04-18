import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { ListRoomsComponent } from './components/room/list-rooms/list-rooms.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DetailRoomComponent } from './components/room/detail-room/detail-room.component';
import { RoomComponent } from './components/room/room.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import {
  CloudinaryModule,
  CloudinaryConfiguration,
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { WelcomeAreaComponent } from './components/welcome-area/welcome-area.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CreateRoomComponent } from './components/room/create-room/create-room.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ListUsersComponent,
    ListRoomsComponent,
    NavbarComponent,
    DetailRoomComponent,
    RoomComponent,
    WelcomeAreaComponent,
    FooterComponent,
    CreateRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'djbmfd9y6',
      upload_preset: 'nqdq2zze',
    } as CloudinaryConfiguration),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
