import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService, User } from '../shared';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  loggedInUser: User;
  numberOfUsers: number;
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.loggedInUser = {};
  }

  ngOnInit() {
    // this.authService.getUser()
    //   .subscribe(user => {
    //     this.loggedInUser = user;
    //     // console.log(`Leaderboard knows user is ${this.loggedInUser.name}`);
    //   }
    //   );
    this.loggedInUser = this.authService.getUser2();
    this.users = this.af.database.list('/users')
      .map(users => users.sort((a, b) => b.score - a.score)) as FirebaseListObservable<any[]>;
    this.users
      .subscribe(users => {
        this.numberOfUsers = users.length;
        // TODO - look at ng2 animations instead of jQuery
        $('#leaderboard').fadeOut(300).fadeIn(300);
      });
  }

}
