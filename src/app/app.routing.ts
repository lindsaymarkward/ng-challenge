import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users';
import { LeaderboardComponent } from './leaderboard';
import { UserDetailComponent } from './userdetail';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  { path: 'user/:userid', component: UserDetailComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
