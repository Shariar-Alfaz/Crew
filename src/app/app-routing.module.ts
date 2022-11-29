import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
