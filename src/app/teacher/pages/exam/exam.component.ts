import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { IExam } from 'src/app/models/exam.model';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [DialogService],
})
export class ExamComponent extends BaseComponent implements OnInit {
  exam: IExam = {} as IExam;
  submitted: boolean = false;
  classes: Class[] = [];
  duration:number=5;
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private examService:ExamService,
    private datePipe:DatePipe
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClasses();
  }
  getClasses() {
    this.examService.getClasses().subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.classes = [...res.data];
    },(err)=>{
      this.handleErrors(err);
    })
  }
  save(){
    if(!this.exam.classId){
      this.showDialog('There is no class selected.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.exam.title){
      this.showDialog('Exam title can not be empty.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.exam.startTime){
      this.showDialog('Exam time is not selected.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.exam.totalMarks){
      this.showDialog('Total marks cannot be empty.',ErrorDialogTypeEnums.Warning);
      return;
    }
    if(!this.exam.description){
      this.showDialog('Description can not be empty.',ErrorDialogTypeEnums.Warning);
      return;
    }
    var examEnd = new Date(this.exam.startTime);
    examEnd = new Date(examEnd.setMinutes(examEnd.getMinutes()+this.duration));
    this.exam.endTime = this.datePipe.transform(examEnd,"yyyy-MM-dd HH:mm:ss");
    this.exam.startTime = this.datePipe.transform(this.exam.startTime,"yyyy-MM-dd HH:mm:ss");
    this.examService.saveExam(this.exam).subscribe((res)=>{
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.exam=Object.assign({} as IExam,res.singleData);
      this.showDialog("Successfully saved.",ErrorDialogTypeEnums.Success);
    },(err)=>{
      this.handleErrors(err);
    })
  }
}
