import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConnectableObservable } from 'rxjs';
import { IAdmin } from '../models/admin.model';
import { InterceptorService } from '../Root-service/interceptor.service';
import { LayoutService } from './service/app.layout.service';
import { AppTopbarService } from './service/app.topbar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];
  me: IAdmin = {} as IAdmin;
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private service: AppTopbarService,
    private interSer: InterceptorService,
    private router:Router
  ) {}
  ngOnInit() {
    this.getMe();
  }
  getMe() {
    this.service.getMe().subscribe(
      (res) => {
        this.me = Object.assign({} as IAdmin, res.singleData);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logOut() {
    localStorage.clear();
    this.interSer.logOut().subscribe();
    this.router.navigate(['']);
  }
}
