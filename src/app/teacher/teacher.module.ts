import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { PrimengModule } from '../module/pimeng.module';
import { ClassComponent } from './pages/class/class.component';
import { ExamComponent } from './pages/exam/exam.component';
import { QuestionGeneratorComponent } from './pages/question-generator/question-generator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    ClassComponent,
    ExamComponent,
    QuestionGeneratorComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
