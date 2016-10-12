import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../shared';
import { User } from '../shared/models';
// import { Observable } from 'rxjs';
// import * as jQuery from 'jquery';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  numberOfUsers: number;
  users: FirebaseListObservable<any[]>;
  usersSubscription: any; // Observable<User[]>;  // TODO
  menuState: string = 'out';

  constructor(private af: AngularFire, private authService: AuthService) {
    this.loggedInUser = {};
  }

  ngOnInit() {
    this.authService.getUser()
      .subscribe(user => {
        this.loggedInUser = user;
        // console.log(`Leaderboard knows user is ${this.loggedInUser.name}`);
      }
      );
    // this.loggedInUser = this.authService.getUser2();
    this.users = this.af.database.list('/users')
      // , { query: { orderByChild: 'score'} });  // query on the server (Firebase), but can't sort in reverse :(
      .map(users => users.sort((a, b) => b.score - a.score)) as FirebaseListObservable<any[]>;
    this.usersSubscription = this.users
      .subscribe(users => {
        // console.log('got users (again?)');  // should be only once now that we're unsubscribing on destroy
        // TODO - is there a way we can get this more 'easily'?
        this.numberOfUsers = users.length;
        // TODO - look at ng2 animations instead of jQuery
        // $('#leaderboard').fadeOut(300).fadeIn(300);
        this.users._ref.on('child_changed', c => {
          console.log('child_changed ', `#${c.val().uid}`);
          // $(`#${c.val().uid}`).fadeOut(200).fadeIn(200);
          // let uid = 'Rb5eIpywyJNVgNXEMeMVsxfG1n23';
          // $('#judah').fadeOut(200).fadeIn(200);
          // $('#judah').css("background-color", "red")
        });
      });
  }

  ngOnDestroy() {
    // console.log('Destroying leaderboard');
    this.usersSubscription.unsubscribe();
  }

  animate() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
