import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';
  users: Observable<any[]>;  // note: tried using 'FirebaseListObservable<any[]>' but got type conversion error

  constructor(af: AngularFire) {
    this.users = af.database.list('/users')
      .map(items => items.sort((a, b) => {
        if (a.score <= b.score) {
          return 1;
        }
        return -1;
      }));
  }

}
