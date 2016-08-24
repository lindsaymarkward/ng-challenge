import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  users: FirebaseListObservable<any[]>;  // note: tried using 'FirebaseListObservable<any[]>' but got type conversion error

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.users = this.af.database.list('/users')
      .map(items => items.sort((a, b) => {
        if (a.score <= b.score) {
          return 1;
        }
        return -1;
      }));

    var key = this.users.push({
      "email" : "bob@gmail.com",
      "name" : "Bobby",
      "score" : 13
    }).key;
    console.log(key);
  }

  showMore(key) {
    console.log(key);
  }

}
