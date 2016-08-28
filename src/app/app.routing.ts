import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users';
import { LeaderboardComponent } from './leaderboard';
import { UserDetailComponent } from './userdetail';
import { AboutComponent } from './about';

const appRoutes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:userid', component: UserDetailComponent },
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
