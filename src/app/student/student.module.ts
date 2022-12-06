import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrimengModule } from '../module/pimeng.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    PrimengModule
  ]
})
export class StudentModule { }
