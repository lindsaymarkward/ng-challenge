import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import { User } from './models';

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {
  }

  // getUser(): Observable<User> {
  //   this.af.auth.subscribe(auth => {
  //     if (auth) {
  //       let user = { name: auth.auth.displayName, profileImageURL: auth.auth.photoURL };
  //       console.log(auth);
  //       return user;
  //     } else { return null; }
  //   }
  //   );
  // }

  getAuth() {
    return this.af.auth;
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

  isAdmin() {
    return false;
  }

  isLoggedIn() {
    return this.af.auth;
  }
}
