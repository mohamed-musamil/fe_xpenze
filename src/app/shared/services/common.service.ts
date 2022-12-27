import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private showToast = new Subject<any>();
  displayToast = this.showToast.asObservable();

  constructor(private readonly restService: RestService) { }

  setToastMessage(obj: any) {
    this.showToast.next(obj);
  }

  checkServer() {
    return this.restService.checkServer().subscribe(res=> res)
  }
}
