import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private srvAuth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(localStorage.getItem('authSession'));

    if (localStorage.getItem('authSession')) {
      /** Todo : vérifier la validité le token de session */
      return of(true);
    } else {
      /** Pas de token de session : forcer la procédure de login */
      this.router.navigate(['/login']);
      return of(false);
    }
  }

}