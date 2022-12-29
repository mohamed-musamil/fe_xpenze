import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.storage.getUser();
    const isLoggedIn = account?.accessToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isRefreshUrl = request.url.includes('/auth/refresh');
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${account.accessToken}` }
        });
    }
    if (isLoggedIn && isRefreshUrl) {
      request = request.clone({
          setHeaders: { Authorization: `Bearer ${account.refreshToken}` }
      });
    }

    return next.handle(request);
}
}
