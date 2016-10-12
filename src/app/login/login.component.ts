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

  onAction(eventData: any) {
    // console.log(eventData);
    this.authService.login(eventData.method)
      .then(result => {
        console.log(result);
        this.router.navigate(['/leaderboard']);
      },
      error => {
        console.log('Error... ');
        console.log(error);
      }
      );
  }

}
