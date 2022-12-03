import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './pages/class/class.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QuestionGeneratorComponent } from './pages/question-generator/question-generator.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'dashboard/class/:id',component:ClassComponent},
  {path:'question-generator', component:QuestionGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
