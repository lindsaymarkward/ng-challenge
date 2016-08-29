
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { AuthService } from './shared/auth.service';
import { User } from './shared';

const jQuery = require('jquery');
// const bootstrap = require('bootstrap');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'The IT@JCU Challenge';
  auth: AngularFireAuth;
  user: User;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.auth = this.authService.getAuth();
  }

  ngOnInit() {
    this.user = {};
    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
        // console.log(`Got: ${user.name}`);
      });
  }

  createAccount() {
    this.authService.createAccount();
  }

  login() {
    this.authService.login();
    // TODO - check if user exists in the system, then redirect or set
    // this.af.auth.subscribe(auth => {
    //   if (auth) {
    //   }
    // }
    // );
  }

  logout() {
    this.authService.logout();
    this.user = {};
  }
  check() {
    this.authService.getUser()
      .subscribe(user => { this.user = user; console.log(`Checked: ${user.name}`); });

  }
}
