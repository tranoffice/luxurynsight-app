import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../shared/models/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /** formulaire de saisie */
  loginForm: FormGroup;

  /** message d'erreur */
  msgerr = '';

  constructor(
    private srvAuth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    let mem_email = '';
    const mem_password = '9w8RQ2';
    /** 9w8RQ2*/

    /** Remettre le dernier utilisateur mémorisé */
    if (localStorage.getItem('userLogged')) {
      mem_email = localStorage.getItem('userLogged');
    }

    /** Définir le formulaire de saisie */
    if ( this.loginForm === undefined ) {
      this.loginForm = this.formBuilder.group({
        email: [mem_email, Validators.required],
        password: [mem_password, Validators.required],
        rememberme: false
      });
    }
  }

  /**
   * Procédure de login
   */
  login() {
    this.msgerr = '';
    const isValidEmail = new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$');
    if ( !isValidEmail.test(this.loginForm.value.email) ) {
      /** format email invalid */
      this.loginForm.controls.email.setErrors({ InvalidEmail: true });
      this.msgerr = 'Error : invalid email address !';
    } else {
      /** authentification avec l'api */
      this.srvAuth.login( this.loginForm.value.email, this.loginForm.value.password).subscribe(
        res => {
          console.log(res);
          if ( res.status === 200) {
            /** Authentificatio OK */
            if ( this.loginForm.value.rememberme ) {
              /** Mémoriser l'utilisateur si demandé */
              localStorage.setItem('userLogged', this.loginForm.value.email);
            } else {
              localStorage.removeItem('userLogged');
            }
            this.router.navigate(['/']);
          } else {
            /** Authentificatio KO */
            this.loginForm.controls.email.setErrors({ InvalidEmail: true });
            this.loginForm.controls.password.setErrors({ InvalidPassword: true });
          }
        },
        err => {
          console.log(err);
          this.msgerr = 'Server not responding : ' + err.message;
        }
      );
    }
  }
}
