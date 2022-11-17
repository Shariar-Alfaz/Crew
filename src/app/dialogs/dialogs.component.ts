import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppCustomDialog } from '../enums/common/AppCustomDialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
customDialogOption:AppCustomDialog = {} as AppCustomDialog;
  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig
  ) {
    this.customDialogOption=Object.assign({},config.data);
  }

  ngOnInit(): void {
  }
  handleDialogOkClick(){
    this.ref.close(true);
  }
  handleDialogNoClick() {
    this.ref.close(false);
  }

  handleDialogYesClick() {
    this.ref.close(true);
  }

}
