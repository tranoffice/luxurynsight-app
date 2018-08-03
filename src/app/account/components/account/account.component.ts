import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../shared/models/apiresponse';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  /** formulaire de saisie */
  accountForm: FormGroup;
  /** message d'erreur */
  msgerr = '';

  constructor(
    private srvAuth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    if ( this.accountForm === undefined ) {
      this.accountForm = this.formBuilder.group({
        email: [this.srvAuth.userAccount.email, Validators.required],
        firstname: [this.srvAuth.userAccount.firstname, Validators.required],
        lastname: [this.srvAuth.userAccount.lastname, Validators.required],
      });
    }
  }

  /**
   * Sauvegarder les modifications du compte d'utlisateur
   */
  save() {
    this.msgerr = '';
    /** extraire la saisie du formulaire  */
    this.srvAuth.userAccount.firstname = this.accountForm.value.firstname;
    this.srvAuth.userAccount.lastname = this.accountForm.value.lastname;
    this.srvAuth.userAccount.email = this.accountForm.value.email;
    this.srvAuth.userAccount.session = localStorage.getItem('authSession');

    /** Poster les modifications */
    this.srvAuth.modifyAccount(this.srvAuth.userAccount).subscribe(
      (res: ApiResponse) => {
        console.log(res);
        if ( res.status === 200 ) {
          this.srvAuth.userLogged.next(this.srvAuth.userAccount);
          this.router.navigate(['/']);
        } else {
          this.msgerr = '';
        }
      },
      err => {
        console.log(err);
        this.msgerr = 'Error server : ' + err.message;
      }
    );
  }

}
