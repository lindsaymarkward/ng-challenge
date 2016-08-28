import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable()
export class AuthService {

  private auth: AngularFireAuth;

  constructor(private af: AngularFire) {
    this.auth = this.af.auth;
  }
}
