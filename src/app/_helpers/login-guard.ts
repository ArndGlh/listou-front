import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

  // TODO a changer !!
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.tokenStorageService.getUser !== null;
  }
}