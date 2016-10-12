import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() action: string;
  @Output() onAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  clickAction(method: string) {
    this.onAction.emit({action: this.action, method: method});
  }

  submit(form) {
    console.log(form);
  }
}
