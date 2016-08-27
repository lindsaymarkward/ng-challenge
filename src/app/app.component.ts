
import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

const jQuery = require('jquery');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The IT@JCU Challenge';

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
  }

}
