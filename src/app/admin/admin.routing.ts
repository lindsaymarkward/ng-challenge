import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent, ChallengesComponent } from './';
import { UsersComponent } from './users';
import { UserDetailComponent } from './userdetail';
import { AuthGuardService } from '../shared';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: AdminComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/:userid', component: UserDetailComponent },
      { path: 'challenges', component: ChallengesComponent },
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);
