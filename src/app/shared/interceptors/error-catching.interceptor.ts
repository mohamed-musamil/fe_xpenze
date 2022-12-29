import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { EMPTY } from 'rxjs';
import { ErrorDialogService } from '../services/error-dialog.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private readonly errorService: ErrorDialogService, public route: Router, private readonly commonService: CommonService,
    private readonly storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let url = error.url.replaceAll(environment.apiUrl, 'BASE_URI//_')
        if(error.status === 404 || error.status === 400) {
          this.route.navigate(['/auth'])
        }
        if(error.status === 403) {
          if(this.storageService.checkStorage()) {
            this.commonService.refreshToken()
          } else {
            this.route.navigate(['/auth'])
          }
        }
        if(error.status === 0 || error.status === 409) {
          let data = {};
          data = {
            status : error.status,
            url : url,
            statusText: error.error?.message,
            time: error.error?.currentTime,
            user: error.error?.currentUser
          }
          this.errorService.openErrorPopup(data)
        }
        return EMPTY
      })
    );
  }
}
