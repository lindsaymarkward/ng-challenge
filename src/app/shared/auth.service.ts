import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {
    
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
