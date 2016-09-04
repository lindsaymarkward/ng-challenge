import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {

  users: FirebaseListObservable<any[]>;
  sortBy = 'name';
  sortReverse = false;

  constructor(
    private af: AngularFire,
    private router: Router) {
  }

  ngOnInit() {
    // console.log('getting users');
    this.users = this.af.database.list('/users');
    this.sortUsers();
  }

  sortUsers() {
    this.users = this.users
      .map(users => users.sort((a, b) => {
        let result: number;
        if (this.sortBy === 'name') {
          result = b.name < a.name ? 1 : -1;
        } else if (this.sortBy === 'score') {
          result = b.score - a.score;
        }
        if (this.sortReverse) {
          result = -result;
        }
        return result;
      })) as FirebaseListObservable<any[]>;
  }

  gotoDetail(key) {
    // console.log(`goto ${key}`);
    this.router.navigate(['user', key]);
  }

  changeSort(field) {
    if (this.sortBy === field) {
      this.sortReverse = !this.sortReverse;
    }
    this.sortBy = field;
    this.sortUsers();
    // this.getSortedUsers();  // TODO - is there a better way to update list?
  }
}
