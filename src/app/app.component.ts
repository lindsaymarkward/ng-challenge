
import { Component, OnInit } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { AuthService } from './shared/auth.service';
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
  user: User;  // TODO - use this

  constructor(private af: AngularFire, private authService: AuthService) {
    this.auth = this.authService.getAuth();
  }

  ngOnInit() {
    // TODO - change this. Put it in AuthService somewhere...
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = { name: auth.auth.displayName, profileImageURL: auth.auth.photoURL };
      }
    }
    );
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
