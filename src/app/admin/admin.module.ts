import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';
import { AppLayoutModule } from '../layout/app.layout.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { PrimengModule } from '../module/pimeng.module';
import { AdminListComponent } from './pages/admin-list/admin-list.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 60,
  bgsType: SPINNER.ballScaleMultiple, // background spinner type
  fgsType: SPINNER.rectangleBounce, // foreground spinner type
  fgsSize:90,
  fgsColor: 'red',
  blur:90,
  gap:24,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 2, // progress bar thickness
  // fgsColor: '#034ea1',
  overlayColor: 'rgba(40,40,40,.7)',
  text: "Loading.....",
  // textColor: "#FFFFFF",
  // textPosition: "center-center",
};
@NgModule({
  declarations: [
    DashboardComponent,
    StudentComponent,
    AdminListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    PrimengModule,
  ],
  providers:[
  ]
})
export class AdminModule { }
