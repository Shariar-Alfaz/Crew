import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from '../enums/common/base.component';
import { Login } from '../models/login.model';
import { LocalStorageService } from '../Root-service/local-storage.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[DialogService]
})
export class LoginComponent extends BaseComponent implements OnInit {
  login:Login = {} as Login;
  pageLoader:string='root-loader';
  error:boolean=false;
  errMessage:string='';
  constructor(
    private loginService:LoginService,
    public override loaderService:NgxUiLoaderService,
    public override dialogService:DialogService,
    private localStorageService:LocalStorageService,
    private router:Router ) {
      super(dialogService,loaderService);
      if(loginService.isLogedIn()){
        let role = localStorageService.getData("role");
        if(role=='admin'){
          router.navigate(['admin/dashboard']);
        }else if(role=='student'){
          router.navigate(['student/dashboard']);
        }else if(role=='teacher'){
          router.navigate(['teacher/dashboard']);
        }
      }
    }

  ngOnInit(): void {
  }
  async submit(){
    this.managerLoader(true,this.pageLoader);
    await this.loginService.submit(this.login).subscribe((res)=>{
      this.managerLoader(false,this.pageLoader);
      this.localStorageService.setData('token',res.key);
      this.localStorageService.setData('app-key',res.getMe)
      if(res.role==1){
        this.localStorageService.setData('role','admin');
        this.router.navigate(['admin/dashboard']);
      }else if(res.role==2){
        this.localStorageService.setData('role','student');
        this.router.navigate(['student/dashboard']);
      }else if(res.role==3){
        this.localStorageService.setData('role','teacher');
        this.router.navigate(['teacher/dashboard']);
      }
    },(err)=>{
      this.managerLoader(false,this.pageLoader);
      this.error=true;
      if(err.status==422){
        this.errMessage = 'Username or password not matched'
      }
    })
  }
}
