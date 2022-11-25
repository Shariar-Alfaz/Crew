import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { LocalStorageService } from 'src/app/Root-service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private BASE_URL:string='Login/api/';
  constructor(private http:HttpClient,private localStorageService:LocalStorageService) { }
  submit(login:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}Login`,login);
  }
  isLogedIn():boolean{
    return this.localStorageService.getData("token")?true:false;
  }
}
