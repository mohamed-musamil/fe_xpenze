import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLayoutService {

  constructor(public readonly restService: RestService, private readonly commonService: CommonService) { }

  register(data) {
    let url = 'auth/register'
    return this.restService.save(url, data).pipe(map((response: any) => { return response} ))
  }

  login(data) {
    let url = 'auth/login'
    return this.restService.save(url, data).pipe(map((response: any) => { return response} ))
  }
}
