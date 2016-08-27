import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  numberOfUsers: number;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    // this.users = this.af.database.list('/users');
    this.af.database.list('/users')
    .subscribe(users => { this.numberOfUsers = users.length; });
  }

}
