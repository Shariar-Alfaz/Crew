import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { LoginComponent } from './login/login.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { PrimengModule } from './module/pimeng.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Root-service/interceptor/auth.interceptor';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 60,
  bgsType: SPINNER.ballScaleMultiple, // background spinner type
  fgsType: SPINNER.rectangleBounce, // foreground spinner type
  fgsSize:90,
  fgsColor: 'red',
  blur:15,
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
    AppComponent,
    LoginComponent,
    DialogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    DynamicDialogModule,
    PrimengModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
