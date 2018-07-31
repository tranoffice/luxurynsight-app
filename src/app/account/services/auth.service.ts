import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { share, map } from 'rxjs/operators';
import { Account } from '../../shared/models/account';
import { ApiResponse } from '../../shared/models/apiresponse';
import { of, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  userAccount: Account;
  userLogged = new Subject<Account>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /**
   * Procédure de login
   * @param email : email saisi dans le formulaire
   * @param password : mot de passe saisi dans le formulaire
   */
  login( email: string, password: string ) {

    const restemp = {
      'status': 200,
      'message': 'OK!',
      'user': {
        'email': 'bertrand.tran.office@gmail.com',
        'firstname': 'bertrand3',
        'lastname': 'tran',
        'session': 'c16a5320fa475530d9583c34fd356ef5'
      }
    };
    if ( password !== '9w8RQ2' || email !== 'bertrand.tran.office@gmail.com' ) {
      restemp.status = 403;
    }
    return(of(restemp).pipe(
      map( res => {
        /** Login OK */
        if (res.status === 200) {
          /** Mémorisation le token de session */
          localStorage.setItem('authSession', res.user.session);
          this.userAccount = res.user;
          /** Déclencher l'observable pour signaler l'état de connexion */
          this.userLogged.next(this.userAccount);
        }
        return(res);
      })
    ));

    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post(
    //     'https://www.luxurynsight.com/auth-test.php',
    //     { email: email, password: password},
    //     { headers: headers }
    //   )
    //   .pipe(
    //     map( (res: ApiResponse) => {
    //       /** Login OK */
    //       if (res.status === 200) {
    //         /** Mémorisation le token de session */
    //         localStorage.setItem('authSession', res.user.session);
    //         this.userAccount = res.user;
    //         /** Déclencher l'observable pour signaler l'état de connexion */
    //         this.userLogged.next(this.userAccount);
    //       }
    //       return(res);
    //     })
    //   );
  }

  /**
   * Procédure de logout
   * On libère le token de session dans local storage et repointe vers le login
   */
  logout() {
    localStorage.removeItem('authSession');
    this.router.navigate(['/login']);
    this.userLogged.next(new Account());
  }

  /**
   * Changer les propriétés du compte
   * @param newAccount : modification à apporter au compte de l'utilisateur
   */
  modifyAccount( newAccount: Account ) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'https://www.luxurynsight.com/update-test.php',
      newAccount,
      { headers: headers }
    );
  }
}
