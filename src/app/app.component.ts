
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { User } from './shared';

// const jQuery = require('jquery');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'IT@JCU Challenge';
  auth: AngularFireAuth;
  user: User;
  admin = false;

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    private router: Router) {
    this.auth = this.authService.getAuth();
  }

  ngOnInit() {
    console.log(this.auth);
    this.user = {};

    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
        this.admin = user.admin;
        console.log(`Got: ${user.name}, ${user.admin}`);
      });
  }

  createAccount() {
    this.authService.createAccount();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.user = {};
    this.router.navigate(['/']);
  }

  check() {
    // note: each time this subscribes, it adds a new subscription
    // this.authService.getUser()
    //   .subscribe(user => { this.user = user; console.log(`Checked: ${user.name}`); });
    // console.log(this.auth);

    console.log(this.authService.getUser2());
  }
}
