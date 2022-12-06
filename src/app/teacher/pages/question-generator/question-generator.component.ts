import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { IExam, IFinalQuestion, IOption, IQuestion, IShowQuestion } from 'src/app/models/exam.model';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.scss'],
  providers:[DialogService]
})
export class QuestionGeneratorComponent extends BaseComponent implements OnInit {
  exams:IExam[]=[];
  selectedExam:IExam={} as IExam;
  options:IOption[]=[];
  selectedOption:IOption={}as IOption;
  question:IQuestion={} as IQuestion;
  id:number=1;
  finalQuestion:IFinalQuestion={} as IFinalQuestion;
  ans:string='';
  totalTime:any;
  allQues:IShowQuestion[]=[];
  anyT:any;
  constructor(
    public override loaderService:NgxUiLoaderService,
    public override dialogService:DialogService,
    private examService:ExamService
  ) {
    super(dialogService,loaderService);

  }

  ngOnInit(): void {
    let option:IOption ={
      id:this.id,
      name:'option',
      questionId:0,
    }
    this.options.push(option);
    this.id++;
    this.getExams();
  }
  getExams(){
    this.examService.getExam().subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.exams=[...res.data];
    },(err)=>{
      this.handleErrors(err);
    })
  }
  addOption(){
    let option:IOption ={
      id:this.id,
      name:'option',
      questionId:0,
    }
    this.options.push(option);
    this.options=[...this.options];
    this.id++;
  }
  saveQuestion(){
    if(!this.selectedExam.id){
      this.showDialog('Please select an exam.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.question.title){
      this.showDialog('No question typed.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!(this.options.length>=2)){
      this.showDialog('At least two options have to add',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(this.ans==''){
      this,this.showDialog('Select answer for this question.',ErrorDialogTypeEnums.Warning);
      return;
    }
    this.question.examId=this.selectedExam.id;
    this.finalQuestion.question=this.question;
    this.finalQuestion.option=this.options;
    this.finalQuestion.question.answer=this.ans;
    this.examService.saveQuestion(this.finalQuestion).subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      if(res.success){
        this.showDialog(res.message,ErrorDialogTypeEnums.Success);
        this.getQuestions();
        return;
      }

    },err=>{
      this.handleErrors(err);
    })
  }
  examChange(){
    this.selectedExam.startTime=new Date(this.selectedExam.startTime);
    this.selectedExam.endTime=new Date(this.selectedExam.endTime);
    this.totalTime = ((this.selectedExam.endTime.getTime()-this.selectedExam.startTime.getTime())/1000)/60;
    this.getQuestions();
  }
getQuestions(){
  this.examService.getQuestions(this.selectedExam.id).subscribe((res)=>{
    this.allQues=[...res.data];
    console.log(this.allQues);
  },err=>{
    this.handleErrors(err);
  })
}
}
