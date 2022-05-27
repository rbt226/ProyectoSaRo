import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselModule } from '@ngu/carousel';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingAreaComponent } from './components/areas/booking-area/booking-area.component';
import { RoomsAreaComponent } from './components/areas/rooms-area/rooms-area.component';
import { ServicesAreaComponent } from './components/areas/services-area/services-area.component';
import { WelcomeAreaComponent } from './components/areas/welcome-area/welcome-area.component';
import { FieldErrorDisplayComponent } from './components/common/error/field-error-display.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { IndexComponent } from './components/index-component/index-component.component';
import { CreateRoomComponent } from './components/room/create-room/create-room.component';
import { DetailRoomComponent } from './components/room/detail-room/detail-room.component';
import { ListRoomsComponent } from './components/room/list-rooms/list-rooms.component';
import { RoomComponent } from './components/room/room.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { GlobalErrorHandler } from './services/global-error-handler';
import { ServerErrorInterceptor } from './services/server-error-interceptor';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { Globals } from './globals';
import { ListFeaturesComponent } from './components/feature/list-features/list-features.component';
import { PickListModule } from 'primeng/picklist';
import { TabMenuModule } from 'primeng/tabmenu';
import { AdminComponent } from './components/admin/admin.component';
import { UserstabComponent } from './components/user/userstab/userstab.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
	GoogleLoginProvider,
	FacebookLoginProvider,
} from 'angularx-social-login';



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
		ContactComponent,
		FieldErrorDisplayComponent,
		ListFeaturesComponent,
		AdminComponent,
		UserstabComponent,
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
			api_key: '771838748496195',
			api_secret: 'yn9HS_biy7UuFGtTZVxhIytA7k',
		} as CloudinaryConfiguration),
		NguCarouselModule,
		NgbModule,
		PickListModule,
		TabMenuModule,
		SocialLoginModule
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

		Globals,
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(
							'71811384167-nlu32imurejp4vr205vvjbr80t0aiok8.apps.googleusercontent.com'
						)

					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('399162584413731'),
					},
				],
			} as SocialAuthServiceConfig,
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
