import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';  // used in AuthService (only needed to avoid IDE error)
import { routing } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { AuthService, AuthGuardService } from './shared';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBP3IERkXI8lyO8_vACVZd4MAwM9kTZjsU',
  authDomain: 'firedemo-4ee41.firebaseapp.com',
  databaseURL: 'https://firedemo-4ee41.firebaseio.com',
  storageBucket: 'firedemo-4ee41.appspot.com',
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Twitter,
  // TODO - find additional/alternative method, since popups don't work in iOS Chrome https://www.firebase.com/docs/web/guide/user-auth.html
  // but not using this default anyway. Probably remove it 
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [AuthService, AuthGuardService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
