import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users';
import { LeaderboardComponent } from './leaderboard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
