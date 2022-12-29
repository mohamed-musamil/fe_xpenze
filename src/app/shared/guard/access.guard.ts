import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAccessGuard implements CanActivate {
  constructor(private router: Router, private readonly storage: StorageService, private readonly commonService: CommonService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      console.log(route.data?.['roles'], this.storage.getUser().roles);
      const isAuthorized = (this.storage.checkStorage() && this.storage.getUser().roles.includes(route.data?.['roles']));
      console.log(isAuthorized);
      if(!isAuthorized) {
        this.router.navigate(['/auth'])
      }
      return isAuthorized;
  } 
}
