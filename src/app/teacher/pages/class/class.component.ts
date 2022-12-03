import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { single } from 'rxjs';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { Student } from 'src/app/models/student.modal';
import { ClassService } from '../../services/class.service';
import { TeacherStudentService } from '../../services/teacher-student.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [DialogService],
})
export class ClassComponent extends BaseComponent implements OnInit {
  class: Class = {} as Class;
  visibleSidebar2: boolean;
  students: Student[] = [];
  selectedStudents: Student[] = [];
  filteredStudents: any;
  classStudents: Student[] = [];
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private studentService: TeacherStudentService
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClass();
    this.getStudents();
    this.getClassStudent();
  }
  getClass() {
    this.classService
      .getClass(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          if (res.hasError) {
            this.showDialog(res.message, ErrorDialogTypeEnums.Error);
            return;
          }
          this.class = Object.assign({} as Class, res.singleData);
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }
  filterStudent(event: any) {
    let filtered: Student[] = [];
    let query = event.query;
    for (let i = 0; i < this.students.length; i++) {
      let student: Student = this.students[i];
      if (
        student.email.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        student.userId.indexOf(query) == 0 ||
        student.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(student);
      }
    }
    this.filteredStudents = filtered;
  }
  getStudents() {
    this.studentService
      .getStudents(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        this.students = [...res.data];
      });
  }
  saveStudentsToClass() {
    if (this.selectedStudents.length == 0) {
      this.showDialog('Select students first!!', ErrorDialogTypeEnums.Warning);
      return;
    }
    this.studentService
      .saveStudents(
        this.selectedStudents,
        this.route.snapshot.paramMap.get('id')
      )
      .subscribe(
        (res) => {
          if (res.success) {
            for (let i in this.selectedStudents) {
              this.classStudents.unshift(this.selectedStudents[i]);
            }
            this.classStudents=[...this.classStudents];
            this.showDialog('Successfully saved', ErrorDialogTypeEnums.Success);
            this.selectedStudents=[];
            this.getStudents();
          }
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }
  getClassStudent() {
    this.studentService
      .getStudentsOfClass(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          if (res.success) {
            this.classStudents = [...res.data];
          }
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }
  removeStudentFromClass(stId: number) {
    this.studentService
      .removeStudentFromClass(stId, this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        if (res.hasError) {
          this.showDialog(res.message, ErrorDialogTypeEnums.Error);
          return;
        }
        var index = this.classStudents.findIndex((f) => f.id == stId);
        this.classStudents.splice(index, 1);
        this.classStudents=[...this.classStudents];
        this.showDialog(res.message, ErrorDialogTypeEnums.Success);
        this.getStudents();
      });
  }
}
