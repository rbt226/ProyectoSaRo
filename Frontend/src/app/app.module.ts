import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

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
import { WelcomeAreaComponent } from './components/areas/welcome-area/welcome-area.component';
import { RoomsAreaComponent } from './components/areas/rooms-area/rooms-area.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './components/index-component/index-component.component';
import { CreateRoomComponent } from './components/room/create-room/create-room.component';
import { GlobalErrorHandler } from './services/global-error-handler';
import { ServerErrorInterceptor } from './services/server-error-interceptor';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { ServicesAreaComponent } from './components/areas/services-area/services-area.component';
import { NguCarouselModule } from '@ngu/carousel';
import { BookingAreaComponent } from './components/areas/booking-area/booking-area.component';   

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
    FooterComponent,
    WelcomeAreaComponent,
    RoomsAreaComponent,
    IndexComponent,
    CreateRoomComponent,
    ServicesAreaComponent,
    BookingAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastNotificationsModule.forRoot({
      duration: 6000,
      position: 'top-right',
      preventDuplicates: true,
    }),
    FileUploadModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'djbmfd9y6',
      upload_preset: 'nqdq2zze',
    } as CloudinaryConfiguration),
    NguCarouselModule,
    NgbModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
