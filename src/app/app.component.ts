
import { Component, OnInit } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { User } from './shared';

const jQuery = require('jquery');
// const bootstrap = require('bootstrap');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The IT@JCU Challenge';
  auth: AngularFireAuth;
  displayName: string;
  userImage: string;
  user: User;

  constructor(private af: AngularFire) {
    this.auth = this.af.auth;
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      // console.log(auth.auth.displayName);
      if (auth) {
        this.displayName = auth.auth.displayName;
        this.userImage = auth.auth.photoURL;
      }
    }
    );
  }

  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }

}
