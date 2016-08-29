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

  createAccount() {
    this.login();  // need to use AuthMethod.Popup so it doesn't navigate away
    // TODO - check for existing user; don't create account if user exists
    this.af.auth.subscribe(auth => {
      if (auth) {
        let user = {
          name: auth.auth.displayName,
          profileImageURL: auth.auth.photoURL,
          uid: auth.auth.uid,
          email: auth.auth.email,
          score: 0,
          admin: false
        };
        console.log(`Creating new user: ${user.name}`);
        this.af.database.object(`/users/${user.uid}`).update(user);
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
