import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard';
import { AboutComponent } from './about';
import { SignupComponent } from './signup';
import { LoginComponent } from './login';

const appRoutes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
