
import { Component, OnInit, ViewEncapsulation, trigger, state, style, transition, animate } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { User } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('profileFade', [
      state('*', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        // NOTE: the order of this style()/animate() cf the other transition matters (this sets style to animate _from_)
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-in-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'IT@JCU Challenge';
  auth: AngularFireAuth;
  user: User;
  admin = false;
  profileState = 'out';

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.auth = this.authService.getAuth();
    // console.log(this.auth);
    this.user = {};

    this.authService.getUser()
      .subscribe(user => {
        this.user = user;
        this.admin = user.admin;
        console.log(`Got: ${user.name}, ${user.admin}`);
      });
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

    this.profileState = this.profileState === 'out' ? 'in' : 'out';
  }
}
