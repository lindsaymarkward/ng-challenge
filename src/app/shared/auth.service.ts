import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import { User } from './models';

@Injectable()
export class AuthService {

  user: User;

  constructor(private af: AngularFire) {
  }

  getUser(): Observable<User> {
    this.af.auth.subscribe(auth => {
      if (auth) {
        let userObservable = this.af.database.object(`/users/${auth.auth.uid}`);
        userObservable.subscribe(
          user => {
            this.user = user;
            return this.user;
          }
        );
        console.log(`getUser(): ${this.user.name}`);
      } else {
        this.user = null;
            return this.user;
      }
    }
    );
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
