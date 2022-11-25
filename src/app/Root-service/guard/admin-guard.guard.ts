import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminGuardService } from './admin-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private service:AdminGuardService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.service.isLoggedIn() && this.service.roleCheck())
      {
        return true;
      }
      this.router.navigate([''],{replaceUrl:true});
      return false;
  }

}
