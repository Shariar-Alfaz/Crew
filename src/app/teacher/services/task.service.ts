import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';
import { ClassTaskDto } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
ROOT_URL:string='Teacher/api/';

  constructor(private http:HttpClient) { }
  getClasses():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Classes`);
  }
  saveTask(Task:ClassTaskDto):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}Save/Task`,Task);
  }
  getClassTask(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/ClassTask/${id}`);
  }
  getMonitor(studentId:any,taskId:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Student/Task/Monitor/${studentId}/${taskId}`);
  }
}
