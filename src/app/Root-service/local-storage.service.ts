import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setData(key:string,data:any){
    localStorage.setItem(key,data);
  }
  getData(key:string){

    return localStorage.getItem(key);
  }
  removeData(key:string){
    localStorage.removeItem(key);
  }
  removeAll(){
    localStorage.clear();
  }
}
