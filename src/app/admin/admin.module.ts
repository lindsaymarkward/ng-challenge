import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminRouting } from './admin.routing';
import { AdminComponent } from './admin.component';
import { ChallengesComponent } from './challenges';

@NgModule({
  imports: [
    CommonModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    ChallengesComponent,
  ]
})
export class AdminModule { }
