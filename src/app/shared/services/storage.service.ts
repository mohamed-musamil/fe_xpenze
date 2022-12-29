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
    let obj = JSON.stringify(data)
    obj = obj.replace(obj, btoa(obj));
    localStorage.setItem(this.keyName, obj);
  }

  getUser(){
    let user = localStorage.getItem(this.keyName);
    if(user) user = user.replace(user, atob(user));
    return JSON.parse(user!);
  }

  logOut(){
    localStorage.clear();
  }

  checkStorage():Boolean{
    let user = localStorage.getItem(this.keyName);
    if(user) user = user.replace(user, atob(user));
    return !!JSON.parse(user!);
  }
}
