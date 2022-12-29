import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private message = new Subject<any>();
  getMesssge = this.message.asObservable();

  constructor(private readonly restService: RestService, public route: Router, private readonly storageService: StorageService) { }

  setMessage(obj: any) {
    this.message.next(obj);
  }

  checkServer() {
    return this.restService.checkServer().subscribe(res=> res)
  }

  getCurrentUser() {
    let url = 'Currentuser'
    return this.restService.get(url).pipe(map(res=> res))
  }

  refreshToken() {
    let url = 'auth/refresh'
    return this.restService.get(url).subscribe(res=> {
      if(this.storageService.checkStorage()) {
        let obj = this.storageService.getUser()
        obj.accessToken = res.accessToken
        obj.roles = res.roles
        this.storageService.saveUser(obj)
        this.route.navigate(['/auth'])
      } else {
        this.route.navigate(['/auth'])
      }
      return res
    })
  }

  routeRole() {
    let data = this.storageService.getUser();
    if(this.storageService.checkStorage()) {
      if(data.roles.includes('Admin')) {
        this.route.navigate(['/admin'])
      } else {
        this.route.navigate(['/'])
      }
    }
  }

  logout() {
    this.storageService.logOut();
    this.route.navigate(['/auth']);
  }
}
