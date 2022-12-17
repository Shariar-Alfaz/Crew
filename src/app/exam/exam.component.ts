import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { ConnectableObservable } from 'rxjs';
import { BaseComponent } from '../enums/common/base.component';
import { ErrorDialogTypeEnums } from '../enums/common/common.enum';
import { IAnswerScript, IExam, IFinalQuestion, IShowQuestion } from '../models/exam.model';
import { ExamService } from './service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [DialogService],
})
export class ExamComponent extends BaseComponent implements OnInit, OnDestroy {
  exam: IExam = {} as IExam;
  fQuestion: IShowQuestion[] = [];
  answerScript:IAnswerScript[]=[];
  totalTime: any;
  anyT: any;
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private examService: ExamService,
    private route: ActivatedRoute
  ) {
    super(dialogService, loaderService);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getExam();
    this.getQuestions();

    window.addEventListener('blur', () => {
      if (this.exam.id != null || this.exam.id != undefined) {
        this.blockMe();
      } else {
        this.showDialog(
          'You have been blocked from this exam',
          ErrorDialogTypeEnums.Error
        );
      }
    });
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
    // document.onkeydown = (e) => {
    //   if (
    //     e.keyCode === 123 ||
    //     this.ctrlShiftKey(e, 'I') ||
    //     this.ctrlShiftKey(e, 'J') ||
    //     this.ctrlShiftKey(e, 'C') ||
    //     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    //   )
    //     return false;
    //   return true;
    // };
    document.onkeydown=(e)=>{
      console.log('Key pressed');
    }
  }

  getExam() {
    this.examService
      .getExamById(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          if (res.hasError) {
            this.showDialog(res.message, ErrorDialogTypeEnums.Error);
            return;
          }
          this.exam = res.singleData;
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }

  getQuestions() {
    this.examService
      .getQuestion(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          if (res.hasError) {
            this.showDialog(res.message, ErrorDialogTypeEnums.Information);
            return;
          }
          this.fQuestion = [...res.data];
          for(let i in this.fQuestion){
            let ans:IAnswerScript={}as IAnswerScript;
            ans.questionId=this.fQuestion[i].id;
            this.answerScript.push(ans);
          }
        },
        (err) => {
          this.handleErrors(err);
        }
      );
  }
  getTotalTime(startTime: any, endTime: any) {
    let s = new Date(startTime);
    let e = new Date(endTime);
    return (e.getTime() - s.getTime()) / 1000 / 60;
  }
  ctrlShiftKey(e: any, keyCode: any) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }
  blockMe() {
    this.examService.blockMe(this.exam.id).subscribe(
      (res) => {
        if (res.success) {
          this.showDialog(res.message, ErrorDialogTypeEnums.Error);
          return;
        }
      },
      (err) => {
        this.handleErrors(err);
      }
    );
  }
}
