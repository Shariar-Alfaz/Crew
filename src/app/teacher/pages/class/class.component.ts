import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers:[DialogService]
})
export class ClassComponent extends BaseComponent implements OnInit {
  class: Class = {} as Class;
  visibleSidebar2:boolean;
  selectedStudents:any;
  filteredStudents:any;
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private classService:ClassService,
    private route:ActivatedRoute
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClass();
  }
  getClass() {
    this.classService.getClass(this.route.snapshot.paramMap.get('id')).subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.class=Object.assign({}as Class,res.singleData);
    },(err)=>{
      this.handleErrors(err);
    })
  }
  filterStudent(event:any){}
}
