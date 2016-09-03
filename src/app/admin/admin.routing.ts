import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './';
// import { UsersComponent } from './users';
// import { AuthGuardService } from '../shared';
import { ChallengesComponent } from './challenges';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminComponent },
      // TODO - move these in here...
      // { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
      // { path: 'user/:userid', component: UserDetailComponent },
      { path: 'challenges', component: ChallengesComponent },
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);
