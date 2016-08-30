import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
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
  }

  gotoDetail(key) {
    this.router.navigate(['/user', key]);
  }

}
