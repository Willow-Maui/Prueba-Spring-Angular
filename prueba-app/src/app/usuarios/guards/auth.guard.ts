import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()){
      if(this.isTokenExpired()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;}
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  isTokenExpired():boolean{
    let token=this.authService.token;
    let datos= this.authService.obtenerDatosToken(token);
    let now=new Date().getTime()/1000;
    if(datos.exp<now)
      return true;
    return false;
  }
}
