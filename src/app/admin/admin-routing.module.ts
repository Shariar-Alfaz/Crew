import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'student-management',component:StudentComponent},
  {path:'admin-management',component:AdminListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
