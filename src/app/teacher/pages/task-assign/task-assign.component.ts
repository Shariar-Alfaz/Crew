import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { ClassTaskDto } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-assign',
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.scss'],
  providers: [DialogService],
})
export class TaskAssignComponent extends BaseComponent implements OnInit {
  classTask: ClassTaskDto = {} as ClassTaskDto;
  submitted: boolean = false;
  classes: Class[] = [];
  constructor(
    public override loaderService: NgxUiLoaderService,
    public override dialogService: DialogService,
    private taskService: TaskService
  ) {
    super(dialogService, loaderService);
  }

  ngOnInit(): void {
    this.getClasses();
  }
  getClasses() {
    this.taskService.getClasses().subscribe(
      (res) => {
        if (res.hasError) {
          this.showDialog(res.message, ErrorDialogTypeEnums.Error);
          return;
        }
        this.classes = [...res.data];
      },
      (err) => {
        this.handleErrors(err);
      }
    );
  }
  save() {
    this.taskService.saveTask(this.classTask).subscribe(
      (res) => {
        if (res.hasError) {
          this.showDialog(res.message, ErrorDialogTypeEnums.Error);
          return;
        }
        this.classTask = Object.assign({} as ClassTaskDto, res.singleData);
        this.showDialog("Successfully Saved",ErrorDialogTypeEnums.Success);
      },
      (err) => {
        this.handleErrors(err);
      }
    );
  }
}
