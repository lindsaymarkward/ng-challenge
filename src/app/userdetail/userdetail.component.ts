import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: 'userdetail.component.html',
  styleUrls: ['userdetail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public userObservable: FirebaseObjectObservable<any>;
  public user: any;

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
        // console.log(user);
      }
    );
  });
  }

  update(score) {
    this.userObservable.update({ score: parseInt(score, 10) });
    // return to the users list
    this.router.navigate(['/users']);
  }

  remove() {
    this.userObservable.remove();
    // return to the users list
    this.router.navigate(['/users']);
  }

}
