import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from './models';
import { AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  private isCreatingUser = false;
  private user: User;
  public isAuthenticated = false;
  constructor(private af: AngularFire) {
    this.setupLogin();
  }

  // setup auth subscription (handles login and user account creation)
  setupLogin() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log(`Currently logged in with uid ${auth.auth.uid}`);
        if (!this.isCreatingUser) {  // just login
          // check for existing user
          this.af.database.object(`/users/${auth.auth.uid}`)
            .subscribe(checkedUser => {
              if (!checkedUser.uid) {
                // TODO - message about signing up
                console.log('User does not exist; Logging out');
                this.logout();
              }
              this.isAuthenticated = true;
              this.user = checkedUser;
              console.log(`in setup: ${this.user}`);
              // don't need to do anything else; user will just be logged in
            });
        } else {
          let loggedInUser = this.af.database.object(`/users/${auth.auth.uid}`);
          loggedInUser.subscribe(checkedUser => {
            // check if user exists already
            if (!checkedUser.uid) {
              let user = {
                name: auth.auth.displayName,
                profileImageURL: auth.auth.photoURL,
                uid: auth.auth.uid,
                email: auth.auth.email,
                score: 0,
                admin: false
              };
              console.log(`Creating new user: ${user.name}`);
              loggedInUser.update(user);
            }
            this.isCreatingUser = false;
          }
          );
        }
      }
    });
  }

  getUser(): Observable<User> {
    console.log('Getting user...');
    // return Observable.of(this.user);  // another failed idea...
    return this.af.auth.flatMap(auth => {
      if (auth) {
        // return Observable.of(this.user);
        return this.af.database.object(`/users/${auth.auth.uid}`);
      } else {
        // return empty 'user'
        return Observable.of({});
      }
    });
  }

  // attempt at making a more efficient way of getting user, but consumers of this need it asynchronously, it seems.
  getUser2() {
    console.log(this.user);
    return this.user;
  }

  createAccount(method: string) {
    this.isCreatingUser = true;  // set back to false by subscriber function
    this.login(method);  // need to use AuthMethod.Popup so it doesn't navigate away
  }

  getAuth() {
    return this.af.auth;
  }

  login(method: string) {
    let firebaseAuthConfig: any;
    switch (method) {
      case 'Facebook':
        firebaseAuthConfig = { provider: AuthProviders.Facebook, method: AuthMethods.Popup, };
        break;
      case 'Google':
        firebaseAuthConfig = { provider: AuthProviders.Google, method: AuthMethods.Popup, };
        break;
      case 'Twitter':
        firebaseAuthConfig = { provider: AuthProviders.Twitter, method: AuthMethods.Popup, };
    }
    this.af.auth.login(firebaseAuthConfig);
  }

  logout() {
    this.af.auth.logout();
    this.isAuthenticated = false;
    this.user = {};
  }

  isAdmin() {
    console.log(`isAdmin ${this.user}`);
    if (this.user) {
      return this.user.admin;
    } else {
      return false;
    }
  }

  isLoggedIn() {
    console.log(`isLoggedIn() ${this.isAuthenticated}`);
    return this.isAuthenticated;
  }
}
