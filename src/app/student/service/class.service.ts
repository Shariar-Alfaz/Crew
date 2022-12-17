import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private ROOT_URL: string = 'Student/api/';
  constructor(private http: HttpClient) {}
  getAllClass(): Observable<IHttpResult> {
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Classes`);
  }
  getClass(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Class/${id}`);
  }
  getExams(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Exams/${id}`);
  }
}
