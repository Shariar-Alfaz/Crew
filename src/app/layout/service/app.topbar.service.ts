import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class AppTopbarService {
  private ROOT_URL:string='Admin/api/';
  constructor(private http:HttpClient) { }
  getMe():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}GetMe`);
  }
}
