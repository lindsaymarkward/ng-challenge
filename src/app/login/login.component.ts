import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  action = 'Login';

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
  }

  login() {
    // this.authService.login();
  }

}
