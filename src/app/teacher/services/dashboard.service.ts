import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private ROOT_URL:string = 'Teacher/api/';
  constructor(private http:HttpClient) { }
  getClasses():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Classes`);
  }
}
