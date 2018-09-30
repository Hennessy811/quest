import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';
import { CreateQuestComponent } from './create-quest/create-quest.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule,
  MatStepperModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MockupComponent } from './create-quest/mockup/mockup.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import { ErrorComponent } from './error/error.component';
import {ErrorInterceptor} from './error-interceptor';
import {
  AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import { SocialSigninComponent } from './shared/social-signin/social-signin.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('117096420795-ntn8g2hsh59fe5kk08bd8ujktfjs8qok.apps.googleusercontent.com')
      }
    ]
);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    CreateQuestComponent,
    MockupComponent,
    TasksListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    SocialSigninComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    SocialLoginModule
  ],
  providers: [
    { provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
