import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTANT_CONFIG } from 'src/app/app.constant';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  config = CONSTANT_CONFIG.TOAST_CONFIG;
  constructor(private readonly commonService: CommonService, private toastr: ToastrService) { }

  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 3000,
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 3000,
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 3000,
    });
  }

  showWarn(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 3000,
    });
  }


  showToast(type:string, headerMessage: string, message: string) {
    let toastObj: any = {}
    toastObj.showToast = true;
    toastObj.toast ={
      active: this.config.ACTIVE,
      type:type,
      headerMessage: headerMessage,
      message: message
    }
    console.log(toastObj);
    this.commonService.setToastMessage(toastObj);
  }
}
