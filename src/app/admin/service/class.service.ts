import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/models/class.model';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
ROOT_URL:string='Admin/api';
  constructor(private http:HttpClient) { }
  getClasses():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}/Get/Classes`);
  }
  saveClass(cl:Class):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Save/Class`,cl);
  }
}
