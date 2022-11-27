import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/enums/common/base.component';
import { ErrorDialogTypeEnums } from 'src/app/enums/common/common.enum';
import { Class } from 'src/app/models/class.model';
import { Teacher } from 'src/app/models/teacher.model';
import { ClassService } from '../../service/class.service';
import { TeacherListService } from '../../service/teacher-list.service';

@Component({
  selector: 'app-classmanagement',
  templateUrl: './classmanagement.component.html',
  styleUrls: ['./classmanagement.component.scss'],
  providers: [DialogService],
})
export class ClassmanagementComponent extends BaseComponent implements OnInit {
  selectedTeacher: any;
  filteredTeacher: Teacher[] = [];
  teachers: Teacher[] = [];
  selectedClass: Class = {} as Class;
  classes:Class[]=[];
  searchKey:string='';
  editMode:boolean=false;
  loading:boolean=false;
  submitted:boolean=false;
  @ViewChild('classDataForm',{static:false}) classDataForm:NgForm;
  constructor(
    public loader: NgxUiLoaderService,
    public dialog: DialogService,
    private teacherService: TeacherListService,
    private classService:ClassService
  ) {
    super(dialog, loader);
  }

  ngOnInit(): void {
    this.getTeachers();
    this.getClasses();
  }
  getTeachers() {
    this.teacherService.getTeachers().subscribe((res) => {
      if (res.success) {
        this.teachers = [...res.data];
      }
    });
  }
  filterTeacher(event: any) {
    let get: Teacher[] = [];
    let query = event.query;
    for (let i = 0; i < this.teachers.length; i++) {
      let teacher = this.teachers[i];
      if (
        teacher.name.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        teacher.email.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        teacher.useId.indexOf(query) == 0
      ) {
        get.push(Object.assign({} as Teacher, teacher));
      }
    }
    this.filteredTeacher = get;
  }
  deleteClass(Cl:Class){}
  ClassTableDataSelect(Data:any){
    Object.keys(this.classDataForm.controls).forEach((key)=>{
      this.classDataForm.controls[key].markAllAsTouched();
    });
    this.selectedClass = Object.assign({}as Class,Data.data);
    this.selectedTeacher = this.findTeacher(this.selectedClass.teacherId);

  }
  getClasses(){
    this.loading=true;
    this.classService.getClasses().subscribe((res)=>{
      this.loading=false;
      if(res.success){
        this.setPropertyToList(
          res.data,
          this.teachers,
          'teacherId',
          'teacherName',
          'name'
        );
        this.setPropertyToList(
          res.data,
          this.teachers,
          'teacherId',
          'teacherPic',
          'image'
        );
        this.classes=[...res.data];
        console.log(this.classes);
      }
    },(err)=>{
      this.loading=false;
      this.handleErrors(err);
    })
  }
  saveClass(){
    this.loading =true;
    this.classService.saveClass(this.selectedClass).subscribe((res)=>{
      this.loading=false;
      if(res.hasError){
        this.showDialog(res.message,ErrorDialogTypeEnums.Error);
        return;
      }
      this.setProperty(
        res.singleData,
        this.teachers,
        'teacherId',
        'teacherName',
        'name'
      );
      this.setProperty(
        res.singleData,
        this.teachers,
        'teacherId',
        'teacherPic',
        'image'
      );
      this.selectedClass = Object.assign({}as Class,res.singleData);

      var index = this.classes.findIndex((f)=>f.id==this.selectedClass.id);
      if(index==-1){
        this.classes.unshift(this.selectedClass);
      }else{
        this.classes.splice(index,1,this.selectedClass);
      }
      this.classes=[...this.classes];
      this.ClassTableDataSelect(this.selectedClass);
      this.showDialog('Successfully saved',ErrorDialogTypeEnums.Success);
    },err=>{
      this.loading=false;
      this.handleErrors(err);
    })
  }
  setPropertyToList(
    data: any[],
    sourceData: any[],
    searchProperty: string,
    newProperty: string,
    copyProperty: string
  ) {
    for (let value of data) {
      if (value[searchProperty] != null || value[searchProperty] != undefined) {
        var index = sourceData.findIndex((x) => x.id === value[searchProperty]);
        if (index >= 0) {
          value[newProperty] = sourceData[index][copyProperty];
        } else {
          value[newProperty] = '--';
        }
      } else {
        value[newProperty] = '--';
      }
    }
  }
  findTeacher(id:number){
    for(let i=0;i<this.teachers.length;i++){
      if(this.teachers[i].id==id) return this.teachers[i];
    }
    return null;
  }
  setProperty(
    obj: any,
    sourceData: any[],
    searchProperty: string,
    newProperty: string,
    copyProperty: string
  ) {
    if (obj[searchProperty] != null || obj[searchProperty] != undefined) {
      var index = sourceData.findIndex((x) => x.ID === obj[searchProperty]);
      if (index >= 0) {
        obj[newProperty] = sourceData[index][copyProperty];
      } else {
        obj[newProperty] = '--';
      }
    } else {
      obj[newProperty] = '--';
    }
  }
}
