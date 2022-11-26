import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Teacher, TeacherDto } from 'src/app/models/teacher.model';
import { TeacherListService } from '../../service/teacher-list.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  providers: [DialogService],
})
export class TeacherListComponent extends BaseComponent implements OnInit {
  selectedTeacher: Teacher = {} as Teacher;
  Teachers: Teacher[] = [];
  searchKey: string = '';
  TeacherDialog: boolean = false;
  submitted: boolean = false;
  TeacherNew: TeacherDto = {} as TeacherDto;
  visible: string = 'block';
  con: string;
  pageLoader: string = 'saveTeacher';
  @ViewChild('TeacherDataForm', { static: false }) TeacherDataForm?: NgForm;
  constructor(
    public loader: NgxUiLoaderService,
    public dialog: DialogService,
    private datePipe: DatePipe,
    private teacherService: TeacherListService
  ) {
    super(dialog, loader);
  }

  ngOnInit(): void {
    this.getTeachers();
  }
  TeacherTableDataSelect(Data: Teacher) {}
  editTeacher(teacher: Teacher) {
    teacher.birthDate = new Date(teacher.birthDate);
    this.visible = 'none';
    this.TeacherDialog = true;
    this.TeacherNew = Object.assign({} as TeacherDto, teacher);
  }
  deleteTeacher(teacher: Teacher) {
    var conf = 'Are you sure about deletion?';
    this.dialogRef = this.openConfirmationDialog('Confirmation!', conf);
    this.dialogRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.teacherService.deleteTeacher(teacher.id).subscribe(
          (res) => {
            if (res.success) {
              this.showDialog('Deleted.', ErrorDialogTypeEnums.Success);
              var index = this.Teachers.findIndex((f) => f.id == teacher.id);
              this.Teachers.splice(index, 1);
              this.Teachers = [...this.Teachers];
            }
          },
          (err) => {
            this.showDialog('Something wrong!!', ErrorDialogTypeEnums.Error);
          }
        );
      }
    });
  }
  hideDialog() {
    this.TeacherDialog = false;
    this.submitted = false;
  }
  saveTeacher() {
    this.submitted = true;
    if (!this.TeacherNew.name) {
      this.showDialog('Name is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.TeacherNew.name.match('[a-zA-Z .-]*')) {
      this.showDialog('Name is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }

    if (!this.TeacherNew.useId) {
      this.showDialog('User id is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.TeacherNew.useId.match('([0-9]{2}-{1}[0-9]{4,5}-{1}[1-3]{1})+')) {
      this.showDialog('User id is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.TeacherNew.email) {
      this.showDialog('Email is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (
      !this.TeacherNew.email.match(
        '([a-zA-Z]+[0-9]*){1}[@]{1}(aiub){1}(.){1}(edu){1}'
      )
    ) {
      this.showDialog('Email is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' && !this.TeacherNew.password) {
      this.showDialog('password is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.TeacherNew.birthDate) {
      this.showDialog('Birth date is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' && !(this.TeacherNew.password == this.con)) {
      this.showDialog(
        'Password and confirm password not matched',
        ErrorDialogTypeEnums.Warning
      );
      return;
    }
    this.TeacherNew.date = this.datePipe.transform(
      this.TeacherNew.birthDate,
      'yyyy-MM-dd'
    );
    this.managerLoader(true, this.pageLoader);
    if (this.visible == 'block') {
      this.teacherService.saveTeacher(this.TeacherNew).subscribe(
        (res) => {
          this.managerLoader(false, this.pageLoader);
          if (res.success) {
            this.showDialog(
              'Successfully saved.',
              ErrorDialogTypeEnums.Success
            );
            this.TeacherDialog = false;
            this.selectedTeacher = Object.assign({} as Teacher, res.singleData);
            this.Teachers.unshift(this.selectedTeacher);
            this.TeacherTableDataSelect(this.selectedTeacher);
          }
        },
        (err) => {
          this.managerLoader(false, this.pageLoader);
          if (err.status == 423)
            this.showDialog(
              'User id or email already used.',
              ErrorDialogTypeEnums.Error
            );
          else this.showDialog(err.message, ErrorDialogTypeEnums.Error);
        }
      );
    } else if (this.visible == 'none') {
      this.TeacherNew.password = 'null';
      this.teacherService.updateTeacher(this.TeacherNew).subscribe(
        (res) => {
          this.managerLoader(false, this.pageLoader);
          if (res.hasError) {
            this.showDialog(res.message, ErrorDialogTypeEnums.Error);
            return;
          }
          this.TeacherDialog = false;
          this.showDialog('Updated.', ErrorDialogTypeEnums.Success);
          this.TeacherNew = Object.assign({} as Teacher, res.singleData);
          this.selectedTeacher = Object.assign({} as Teacher, res.singleData);
          this.selectedTeacher.image
            ? (this.selectedTeacher.image = this.selectedTeacher.image)
            : (this.selectedTeacher.image = 'N/A');
          var index = this.Teachers.findIndex(
            (f) => f.id == this.selectedTeacher.id
          );
          this.Teachers.splice(index, 1, this.selectedTeacher);
          this.Teachers = [...this.Teachers];
          this.TeacherTableDataSelect(this.selectedTeacher);
        },
        (err) => {
          this.managerLoader(false, this.pageLoader);
          this.handleErrors(err);
        }
      );
    }
  }
  getTeachers() {
    this.teacherService.getTeachers().subscribe((res) => {
      if (res.success) {
        this.Teachers = [...res.data];
      }
    });
  }
  openNew() {
    this.visible = 'block';
    this.submitted = false;
    this.TeacherDialog = true;
    this.TeacherNew = {} as TeacherDto;
  }
}
