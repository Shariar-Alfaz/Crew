import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers:[DialogService]
})
export class StudentComponent extends BaseComponent implements OnInit {
pageLoder:string='student-loader';
  constructor(public override dialogService:DialogService, public loader:NgxUiLoaderService) {
    super(dialogService,loader);
  }

  ngOnInit(): void {
  }

}
