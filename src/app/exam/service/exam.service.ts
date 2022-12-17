import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
private ROOT_URL:string='Student/api/'
  constructor(private http:HttpClient) { }
  getQuestion(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Questions/${id}`);
  }
  getExamById(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/ExamById/${id}`);
  }
  blockMe(examId:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Block/Me/${examId}`);
  }
}
