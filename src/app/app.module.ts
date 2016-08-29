import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { UsersComponent } from './users/users.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { routing } from './app.routing';
import { UserDetailComponent } from './userdetail/userdetail.component';
import { AboutComponent } from './about/about.component';
import { AuthService, User } from './shared';

export const firebaseConfig = {
  apiKey: 'AIzaSyBP3IERkXI8lyO8_vACVZd4MAwM9kTZjsU',
  authDomain: 'firedemo-4ee41.firebaseapp.com',
  databaseURL: 'https://firedemo-4ee41.firebaseio.com',
  storageBucket: 'firedemo-4ee41.appspot.com',
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LeaderboardComponent,
    UserDetailComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [ AuthService ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
