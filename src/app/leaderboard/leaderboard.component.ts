import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

const jQuery = require('jquery');

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  numberOfUsers: number;
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.users = this.af.database.list('/users')
      .map(users => users.sort((a, b) => b.score - a.score)) as FirebaseListObservable<any[]>;
    this.users
      .subscribe(users => {
        this.numberOfUsers = users.length;
        jQuery('#leaderboard').fadeOut(300).fadeIn(300);
      });
  }

}
