
import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The IT@JCU Challenge';
  numberOfUsers: number;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    // this.users = this.af.database.list('/users');
    this.af.database.list('/users')
    .subscribe(users => { this.numberOfUsers = users.length; });
  }

}
