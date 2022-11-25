import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  private ROOT_URL ="Login/api/"
  constructor(private http:HttpClient) { }
  getNewToken(){
    console.log('inside');
    let refreshToken = {
      appKey:localStorage.getItem('app-key'),
      role:localStorage.getItem('role')
    }
    return this.http.post(`${this.ROOT_URL}RefreshToken`,refreshToken);
  }
  logOut(){
    return this.http.get(`${this.ROOT_URL}Logout`);
  }
}
