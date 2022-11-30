import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { PrimengModule } from '../module/pimeng.module';
import { ClassComponent } from './pages/class/class.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClassComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    PrimengModule
  ]
})
export class TeacherModule { }
