import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  keyName = 'userDetails'
  accesskeyName = 'userAccess'
  constructor() { }

  saveUser(data:any){
    localStorage.removeItem(this.keyName);
    localStorage.setItem(this.keyName, JSON.stringify(data));
  }

  getUser(){
    let user = localStorage.getItem(this.keyName);
    return JSON.parse(user!);
  }

  logOut(){
    localStorage.clear();
  }

  checkStorage():Boolean{
    let user = localStorage.getItem(this.keyName);
    return !!JSON.parse(user!);
  }
}
