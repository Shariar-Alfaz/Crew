import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { PrimengModule } from '../module/pimeng.module';
import { ClassComponent } from './pages/class/class.component';
import { QuestionGeneratorComponent } from './pages/question-generator/question-generator.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClassComponent,
    QuestionGeneratorComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    PrimengModule
  ]
})
export class TeacherModule { }
