import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { adminRouting } from './admin.routing';
import { AdminComponent, ChallengesComponent } from './';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './userdetail/userdetail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    ChallengesComponent,
    UsersComponent,
    UserDetailComponent,
  ]
})
export class AdminModule { }
