import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { IExam } from 'src/app/models/exam.model';
import { ClassService } from '../../service/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [DialogService],
})
export class ClassComponent extends BaseComponent implements OnInit {
  class: Class = {} as Class;
  exams: IExam[] = [];
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClass();
    this.getExam();
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
  getExam() {
    this.classService
      .getExams(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          this.exams = [...res.data];
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }
  makeDuration(startTime: any, endTime: any) {
    let s = new Date(startTime);
    let e = new Date(endTime);
    return (e.getTime() - s.getTime()) / 1000 / 60;
  }
  startExam(id:any){
    this.router.navigate([`/exam/${id}`]);
  }
}
