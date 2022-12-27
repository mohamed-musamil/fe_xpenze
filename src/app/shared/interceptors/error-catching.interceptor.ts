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

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private readonly errorService: ErrorDialogService, public route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let url = error.url.replaceAll(environment.apiUrl, 'BASE_URI//_')
        if(error.status === 404 || error.status === 400) {
          this.route.navigateByUrl('/auth')
        }
        if(error.status === 0) {
          let data = {};
          data = {
            status : error.status,
            url : error.url,
            statusText: error.error?.message,
            time: error.error?.currentTime,
            user: error.error?.currentUser
          }
          this.errorService.openErrorPopup(data);
        }
        if(error.status === 409) {
          let data = {};
          data = {
            status : error.status,
            url : url,
            statusText: error.error?.message,
            time: error.error?.currentTime,
            user: error.error?.currentUser
          }
          this.errorService.openErrorPopup(data);
        }
        return EMPTY
      })
    );
  }
}
