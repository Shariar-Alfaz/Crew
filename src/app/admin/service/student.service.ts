import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { R } from 'chart.js/dist/chunks/helpers.core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';
import { StudentDto } from 'src/app/models/student.modal';
import { TeacherDto } from 'src/app/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  ROOT_URL:string='Admin/api';
  constructor(private http:HttpClient) { }
  saveStudent(student:StudentDto):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Student/Save`,student);
  }
  getStudents():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}/Get/Student`);
  }
  updateStudent(teacher:any):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Update/Student`,teacher);
  }
  deleteStudent(id:number):Observable<IHttpResult>{
    return this.http.delete<IHttpResult>(`${this.ROOT_URL}/Delete/Student/${id}`);
  }
}
