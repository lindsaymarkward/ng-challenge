import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  action = 'Sign Up';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onAction(eventData: any) {
    // console.log(eventData);
    this.authService.createAccount(eventData.method)
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

  login(method: string) {
    this.authService.login(method);
  }

}
// HTML/CSS for signup/login components thanks to: http://bootsnipp.com/snippets/featured/responsive-login-with-social-buttons
