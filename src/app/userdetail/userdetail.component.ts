import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: 'userdetail.component.html',
  styleUrls: ['userdetail.component.css']
})
export class UserDetailComponent implements OnInit {

  private user: any;

  constructor(private af: AngularFire,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
    let userid = params['userid'];
    this.user = userid;
  });
  }

}
