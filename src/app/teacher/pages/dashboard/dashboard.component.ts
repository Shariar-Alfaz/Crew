import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DialogService]
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private dashboardService:DashboardService
  ) {
    super(dialogService, loaderService);
  }
classes:Class[]=[];
  ngOnInit(): void {
    this.getClasses();
  }
  getClasses(){
    this.dashboardService.getClasses().subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.classes = [...res.data];
    },(err)=>{
      this.handleErrors(err);
    })
  }
}
