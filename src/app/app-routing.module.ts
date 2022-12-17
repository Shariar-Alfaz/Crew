import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './login/login.component';
import { AdminGuardGuard } from './Root-service/guard/admin-guard.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path:'admin',
    component:AppLayoutComponent,
    canActivate:[AdminGuardGuard],
    children:[
      {path:'',loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)}
    ]
  },
  {
    path:'teacher',
    component:AppLayoutComponent,
    children:[
      {path:'',loadChildren:()=>import('./teacher/teacher.module').then((m)=>m.TeacherModule)}
    ]
  },
  {
    path:'student',
    component:AppLayoutComponent,
    children:[
      {path:'',loadChildren:()=>import('./student/student.module').then((m)=>m.StudentModule)}
    ]
  },
  {path:'exam/:id',component:ExamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
