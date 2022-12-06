import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from 'src/app/models/exam.model';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private ROOT_URL:string='Teacher/api/';
  constructor(private http:HttpClient) { }
  getClasses():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Classes`);
  }
  saveExam(exam:IExam):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}Save/Exam`,exam);
  }
  getExam():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Exam`);
  }
  saveQuestion(data:any):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}Save/Question`,data);
  }
  getQuestions(id:number):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Questions/${id}`);
  }
}
