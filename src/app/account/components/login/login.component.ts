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
  loginForm: FormGroup;

  constructor(
    private srvAuth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    /** todo : à enlever les valeurs par défaut */
    let mem_email = 'bertrand.tran.office@gmail.com';
    const mem_password = '9w8RQ2';

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
    this.srvAuth.login( this.loginForm.value.email, this.loginForm.value.password).subscribe(
      res => {
        if ( res.status === 200) {
          /** Authentificatio OK */
          if ( this.loginForm.value.rememberme ) {
            /** Mémoriser l'utilisateur si demandé */
            localStorage.setItem('userLogged', this.loginForm.value.email);
          }
          this.router.navigate(['/']);
        } else {
          /** Authentificatio KO */
          this.loginForm.controls.email.setErrors({ InvalidEmail: true });
          this.loginForm.controls.password.setErrors({ InvalidPassword: true });
        }
      }
    );
  }

}
