import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard';
import { AboutComponent } from './about';

const appRoutes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'about', component: AboutComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
