import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Student, StudentDto } from 'src/app/models/student.modal';
import { StudentListService } from '../../service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers:[DialogService]
})
export class StudentComponent extends BaseComponent implements OnInit {
  selectedStudent: Student = {} as Student;
  Students: Student[] = [];
  searchKey: string = '';
  StudentDialog: boolean = false;
  submitted: boolean = false;
  StudentNew: StudentDto = {} as StudentDto;
  visible: string = 'block';
  con: string;
  pageLoader: string = 'saveStudent';
  @ViewChild('StudentDataForm', { static: false }) StudentDataForm?: NgForm;
  constructor(
    public loader: NgxUiLoaderService,
    public dialog: DialogService,
    private datePipe: DatePipe,
    private studentService: StudentListService
  ) {
    super(dialog, loader);
  }

  ngOnInit(): void {
    this.getStudents();
  }
  StudentTableDataSelect(Data: Student) {}
  editStudent(student: Student) {
    student.birthDate = new Date(student.birthDate);
    this.visible = 'none';
    this.StudentDialog = true;
    this.StudentNew = Object.assign({} as StudentDto, student);
  }

  deleteStudent(student: Student) {
    var conf = 'Are you sure about deletion?';
    this.dialogRef = this.openConfirmationDialog('Confirmation!', conf);
    this.dialogRef.onClose.subscribe((value: boolean) => {
      if (value) {
        this.studentService.deleteStudent(student.id).subscribe(
          (res) => {
            if (res.success) {
              this.showDialog('Deleted.', ErrorDialogTypeEnums.Success);
              var index = this.Students.findIndex((f) => f.id == student.id);
              this.Students.splice(index, 1);
              this.Students = [...this.Students];
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
    this.StudentDialog = false;
    this.submitted = false;
  }

  saveStudent() {
    this.submitted = true;
    if (!this.StudentNew.name) {
      this.showDialog('Name is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.StudentNew.name.match('[a-zA-Z .-]*')) {
      this.showDialog('Name is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }

    if (!this.StudentNew.userId) {
      this.showDialog('User id is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.StudentNew.userId.match('([0-9]{2}-{1}[0-9]{4,5}-{1}[1-3]{1})+')) {
      this.showDialog('User id is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.StudentNew.email) {
      this.showDialog('Email is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (
      !this.StudentNew.email.match(
        '([a-zA-Z]+[0-9]*){1}[@]{1}(student).{1}(aiub){1}(.){1}(edu){1}'
      )
    ) {
      this.showDialog('Email is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.StudentNew.phone.match('(01){1}[1356789]{1}[0-9]{8}')) {
      this.showDialog('Name is not valid', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' && !this.StudentNew.password) {
      this.showDialog('password is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (!this.StudentNew.birthDate) {
      this.showDialog('Birth date is required', ErrorDialogTypeEnums.Warning);
      return;
    }
    if (this.visible == 'block' && !(this.StudentNew.password == this.con)) {
      this.showDialog(
        'Password and confirm password not matched',
        ErrorDialogTypeEnums.Warning
      );
      return;
    }
    this.StudentNew.date = this.datePipe.transform(
      this.StudentNew.birthDate,
      'yyyy-MM-dd'
    );
    this.managerLoader(true, this.pageLoader);
    
    if (this.visible == 'block') {
      this.studentService.saveStudent(this.StudentNew).subscribe(
        (res) => {
          this.managerLoader(false, this.pageLoader);
          if (res.success) {
            this.showDialog(
              'Successfully saved.',
              ErrorDialogTypeEnums.Success
            );
            this.StudentDialog = false;
            this.selectedStudent = Object.assign({} as Student, res.singleData);
            this.Students.unshift(this.selectedStudent);
            this.StudentTableDataSelect(this.selectedStudent);
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
      this.StudentNew.password = 'null';
      this.studentService.updateStudent(this.StudentNew).subscribe(
        (res) => {
          this.managerLoader(false, this.pageLoader);
          if (res.hasError) {
            this.showDialog(res.message, ErrorDialogTypeEnums.Error);
            return;
          }
          this.StudentDialog = false;
          this.showDialog('Updated.', ErrorDialogTypeEnums.Success);
          this.StudentNew = Object.assign({} as Student, res.singleData);
          this.selectedStudent = Object.assign({} as Student, res.singleData);
          this.selectedStudent.image
            ? (this.selectedStudent.image = this.selectedStudent.image)
            : (this.selectedStudent.image = 'N/A');
          var index = this.Students.findIndex(
            (f) => f.id == this.selectedStudent.id
          );
          this.Students.splice(index, 1, this.selectedStudent);
          this.Students = [...this.Students];
          this.StudentTableDataSelect(this.selectedStudent);
        },
        (err) => {
          this.managerLoader(false, this.pageLoader);
          this.handleErrors(err);
        }
      );
    }
  }

  getStudents() {
    this.studentService.getStudents().subscribe((res) => {
      if (res.success) {
        this.Students = [...res.data];
      }
    });
  }
  openNew(){
    this.visible = 'block';
    this.submitted = false;
    this.StudentDialog = true;
    this.StudentNew = {} as StudentDto;
  }
}
