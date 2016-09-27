import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../shared';
import { User } from '../shared/models';
// import { Observable } from 'rxjs';
// import * as jQuery from 'jquery';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  numberOfUsers: number;
  users: FirebaseListObservable<any[]>;
  usersSubscription: any; // Observable<User[]>;  // TODO

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
      });
  }

  ngOnDestroy() {
    // console.log('Destroying leaderboard');
    this.usersSubscription.unsubscribe();
  }
}
