import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {

  users: FirebaseListObservable<any[]>;  // note: tried using 'FirebaseListObservable<any[]>' but got type conversion error

  constructor(
    private af: AngularFire,
    private router: Router) {
  }

  ngOnInit() {
    this.users = this.af.database.list('/users')
      .map(users => users.sort((a, b) => b.score - a.score)) as FirebaseListObservable<any[]>;

    // var key = this.users.push({
    //   "email" : "bob@gmail.com",
    //   "name" : "Bobby",
    //   "score" : 13
    // }).key;
    // console.log(key);
  }

  gotoDetail(key) {
    this.router.navigate(['/user', key]);
  }

  update(key, score) {
    this.users.update(key, { score: parseInt(score, 10) });
  }

  remove(key) {
    this.users.remove(key);
  }
}
