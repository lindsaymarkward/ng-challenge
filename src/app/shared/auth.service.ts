import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from './models';

@Injectable()
export class AuthService {

  // user: User;

  constructor(private af: AngularFire) {
  }

  // getUserObs(): Observable<User> {
  //   return this.af.auth
  //     .map(auth => {
  //       if (auth) {
  //         console.log('auth is true');
  //         return this.af.database.object(`/users/${auth.auth.uid}`)
  //           .subscribe(user => { this.user = user; console.log(`getUser(): ${user.name}`); return user as Observable<User>; });
  //       } else {
  //         console.log('auth is false');
  //         this.user = null;
  //         return this.user;
  //       }
  //     }
  //     );
  // }

  getUser(): Observable<User> {
    return this.af.auth.flatMap(auth => {
      if (auth) {
        return this.af.database.object(`/users/${auth.auth.uid}`);
      } else {
        return new Observable<User>();
      }
    });
  }

  // getUser() {
  //   return this.user;
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
