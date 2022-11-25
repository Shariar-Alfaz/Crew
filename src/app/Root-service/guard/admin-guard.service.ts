import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private localStorage:LocalStorageService) { }
  isLoggedIn(){
    return this.localStorage.getData('token')?true:false;
  }
  roleCheck(){
    return this.localStorage.getData('role')=='admin'?true:false;
  }
}
