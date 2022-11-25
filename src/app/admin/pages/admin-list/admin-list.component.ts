import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { IAdmin } from 'src/app/models/admin.model';
import { AdminDto } from 'src/app/models/adminDto.model';
import { AdminlistService } from '../../service/adminlist.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  providers: [DialogService],
})
export class AdminListComponent extends BaseComponent implements OnInit {
  admins: IAdmin[];
  selectedAdmin: IAdmin = {} as IAdmin;
  searchKey: string = '';
  adminDialog: boolean = false;
  adminNew: AdminDto = {} as AdminDto;
  submitted: boolean = false;
  con: string = '';
  pageLoader: string = 'save';
  visible: string = 'block';
  @ViewChild('adminDataForm', { static: false }) adminDataForm?: NgForm;
  constructor(
    public loadService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private adminService: AdminlistService,
    private datePipe: DatePipe
  ) {
    super(dialogService, loadService);
  }

  ngOnInit(): void {
    this.getAll();
  }
  openNew() {
    this.visible = 'block';
    this.submitted = false;
    this.adminDialog = true;
    this.adminNew = {} as AdminDto;
  }
  editAdmin(edit: IAdmin) {
    edit.birthDate = new Date(edit.birthDate);
    this.visible = 'none';
    this.adminDialog = true;
    this.adminNew = Object.assign({} as AdminDto, edit);
    console.log(this.adminNew);
  }
  deleteAdmin(admin: any) {}
  hideDialog() {
    this.adminDialog = false;
    this.submitted = false;
  }
  saveAdmin() {
    this.submitted = true;
    if (!this.adminNew.name) {
      this.showDialog('Name is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.adminNew.name.match('[a-zA-Z .-]*')){
      this.showDialog('Name is not valid',ErrorDialogTypeEnums.Warning);
      return;
    }

    if (!this.adminNew.userId) {
      this.showDialog('User id is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.adminNew.userId.match('([0-9]{2}-{1}[0-9]{4,5}-{1}[1-3]{1})+')){
      this.showDialog('User id is not valid',ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.adminNew.email) {
      this.showDialog('Email is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.adminNew.email.match('([a-zA-Z]+[0-9]*){1}[@]{1}(aiub){1}(.){1}(edu){1}')){
      this.showDialog('Email is not valid',ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' &&!this.adminNew.password) {
      this.showDialog('password is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.adminNew.birthDate) {
      this.showDialog('Birth date is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' && !(this.adminNew.password == this.con)) {
      this.showDialog(
        'Password and confirm password not matched',
        ErrorDialogTypeEnums.Warning
      );
      return;
    }
    this.managerLoader(true, this.pageLoader);
    if(this.visible=='block'){
    this.adminService.saveAdmin(this.adminNew).subscribe(
      (res) => {
        this.managerLoader(false, this.pageLoader);
        if (res.success) {
          this.adminDialog=false;
          this.selectedAdmin = Object.assign({} as IAdmin, res.singleData);
          this.admins.unshift(this.selectedAdmin);
          this.admins = [...this.admins];
          this.adminDialog = false;
          this.adminTableDataSelect(this.selectedAdmin);
          this.showDialog('Successfully saved.', ErrorDialogTypeEnums.Success);
        }
      },
      (err) => {
        this.managerLoader(false, this.pageLoader);
        this.showDialog(err.message, ErrorDialogTypeEnums.Error);
      }
    );
  }else{
    this.adminService.update(Object.assign({} as IAdmin,this.adminNew)).subscribe((res)=>{
      this.managerLoader(false,this.pageLoader);
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.adminDialog=false;
      this.adminNew = Object.assign({} as IAdmin,res.singleData);
      var index = this.admins.findIndex((f)=>f.id==this.adminNew.id);
      this.admins.splice(index,1,this.adminNew);
      this.admins = [...this.admins];
      this.adminTableDataSelect(this.adminNew);
      this.showDialog('Data Updated',ErrorDialogTypeEnums.Success);
    },(err)=>{
      this.managerLoader(false,this.pageLoader);
      this.handleErrors(err);
    })
  }
  }
  adminTableDataSelect(data: IAdmin) {
    if (this.adminDataForm) {
      Object.keys(this.adminDataForm.controls).forEach((key) => {
        this.adminDataForm?.controls[key].markAsTouched();
      });

      this.selectedAdmin = Object.assign({} as IAdmin, data);
    }
  }
  getAll() {
    this.adminService.getAll().subscribe((res) => {
      if (res.success) {
        this.admins = [...res.data];
      }
    });
  }
  private convertBirthDay(date: any) {
    let newDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(newDate);
    return newDate;
  }
}
