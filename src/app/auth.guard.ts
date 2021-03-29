import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private commonService:CommonService,private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return new Promise<boolean>((resolve, reject) => {
        
      //   this.commonService.isUserAuthenticated(this.commonService.getBearerToken()).then(response => {
      //     if (!response['isAuthenticated']) {
      //       console.log(response);
      //       reject(false);
      //       this.router.navigate(['/auth/login'])
      //     } else {
      //       resolve(true);
      //     }
      //   },
      //     error=>{
      //       reject(error.message);
      //       this.router.navigate(['/auth/login']); 
      //     });
      // });

       return true;

  }
  
}
