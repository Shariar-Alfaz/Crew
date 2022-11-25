import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDto } from 'src/app/models/adminDto.model';
import { IHttpResult } from 'src/app/models/IHttpResult.model';

@Injectable({
  providedIn: 'root'
})
export class AdminlistService {
  ROOT_URL:string='Admin/api';
  constructor(private http:HttpClient) { }
  saveAdmin(adminDto:AdminDto):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Save`,adminDto);
  }
  getAll():Observable<IHttpResult>{
    return this.http.get<IHttpResult>(`${this.ROOT_URL}/Get`);
  }
  update(admin:any):Observable<IHttpResult>{
    return this.http.post<IHttpResult>(`${this.ROOT_URL}/Update`,admin);
  }
}
