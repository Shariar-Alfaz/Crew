import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../../service/class.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DialogService]
})
export class DashboardComponent extends BaseComponent implements OnInit {
  classes: Class[] = [];
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private classService: ClassService
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClasses();
  }
  getClasses() {
    this.classService.getAllClass().subscribe((res) => {
      this.classes = [...res.data];
    },(err)=>{
      this.handleErrors(err);
    });
  }
}
