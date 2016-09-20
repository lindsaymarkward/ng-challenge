import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../shared';

@Component({
  selector: 'app-userdetail',
  templateUrl: 'userdetail.component.html',
  styleUrls: ['userdetail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userObservable: FirebaseObjectObservable<any>;
  public user: User;

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let userid = params['userid'];
      // get user from database
      this.userObservable = this.af.database.object(`users/${userid}`);
      this.userObservable.subscribe(
        user => {
          this.user = user;
          // console.log(`userdetail user: ${user.name}`);
        }
      );
    });
  }

  update() {
    // remove invalid key so Firebase can update properly
    delete this.user['$key'];
    delete this.user['$exists'];
    // console.log(this.user);
    // console.log(this.userObservable);
    this.userObservable.update(this.user);
    // return to the users list
    this.router.navigate(['/admin/users']);
  }

  remove() {
    this.userObservable.remove();
    // return to the users list
    this.router.navigate(['/admin/users']);
  }

}
