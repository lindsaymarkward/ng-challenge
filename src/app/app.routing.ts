import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard';
import { AboutComponent } from './about';
// import { AdminComponent } from './admin';
import { AuthGuardService } from './shared';

const appRoutes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  // { path: 'user/:userid', component: UserDetailComponent },
  // { path: 'admin', component: AdminComponent }, //, canActivate: [AuthGuardService] },
];

export const routing = RouterModule.forRoot(appRoutes);
