import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { R } from 'chart.js/dist/chunks/helpers.core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';
import { TeacherDto } from 'src/app/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherListService {
  ROOT_URL:string='Admin/api';
  constructor(private http:HttpClient) { }
  saveTeacher(teacher:TeacherDto):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Teacher/Save`,teacher);
  }
  getTeachers():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}/Get/Teachers`);
  }
  updateTeacher(teacher:any):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Update/Teacher`,teacher);
  }
  deleteTeacher(id:number):Observable<IHttpResult>{
    return this.http.delete<IHttpResult>(`${this.ROOT_URL}/Delete/Teacher/${id}`);
  }
}
