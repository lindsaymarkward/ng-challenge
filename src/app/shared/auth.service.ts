import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from './models';

@Injectable()
export class AuthService {

  // user: User;

  constructor(private af: AngularFire) {
  }

  getUser(): Observable<User> {
    return this.af.auth.flatMap(auth => {
      if (auth) {
        // console.log('auth is true');
        return this.af.database.object(`/users/${auth.auth.uid}`);
      } else {
        // console.log('auth is false');
        return Observable.of({});
      }
    });
  }

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
