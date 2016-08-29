
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { AuthService } from './shared/auth.service';
import { User } from './shared';

const jQuery = require('jquery');
// const bootstrap = require('bootstrap');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'The IT@JCU Challenge';
  auth: AngularFireAuth;
  user: User;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.auth = this.authService.getAuth();
  }

  ngOnInit() {
    // TODO - change this. Put it in AuthService somewhere...
    this.authService.getUser()
      .subscribe(user => { this.user = user; console.log(`Got: ${user.name}`); });

    // this.af.auth.subscribe(auth => {
    //   if (auth) {
    //     let userObservable = this.af.database.object(`/users/${auth.auth.uid}`);
    //     userObservable.subscribe(
    //       user => {
    //         this.user = user;
    //       }
    //     );
    //     console.log(this.user);
    //     console.log(auth.auth);
    //   }
    // }
    // );
  }

  createAccount() {
    this.login();  // need to use AuthMethod.Popup so it doesn't navigate away
    // TODO - move to AuthService
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = {
          name: auth.auth.displayName,
          profileImageURL: auth.auth.photoURL,
          uid: auth.auth.uid,
          email: auth.auth.email,
          score: 0,
          admin: false
        };
        console.log(`Creating new user: ${this.user.name}`);
        this.af.database.object(`/users/${this.user.uid}`).update(this.user);
      }
    }
    );
  }

  login() {
    this.authService.login();
    // TODO - check if user exists in the system, then redirect or set
    // this.af.auth.subscribe(auth => {
    //   if (auth) {
    //   }
    // }
    // );
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }
  check() {
    this.authService.getUser()
      .subscribe(user => { this.user = user; console.log(`Checked: ${user.name}`); });

  }
}
