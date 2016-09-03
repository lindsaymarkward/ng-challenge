import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users';
import { LeaderboardComponent } from './leaderboard';
import { UserDetailComponent } from './userdetail';
import { AboutComponent } from './about';
import { AuthGuardService } from './shared';

const appRoutes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'user/:userid', component: UserDetailComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
