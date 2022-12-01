import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
private ROOT_URL='Teacher/api/'
  constructor(private http:HttpClient) { }
  getClass(id:any):Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}Get/Class/${id }`);
  }
}
