import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { LoginComponent } from './account/components/login/login.component';
import { AccountComponent } from './account/components/account/account.component';
import { AuthGuardService } from './account/services/auth-guard.service';

/**
 * Définition des routes de l'application
 * La vérification de l'authentification avant l'accès aux routes se réalise avec le service AuthGuardService
 */
const routes: Routes = [
  { path: '',               redirectTo: 'home', pathMatch: 'full', canActivate: [ AuthGuardService ] },
  { path: 'home',           component: HomeComponent, canActivate: [ AuthGuardService ] },
  { path: 'login',          component: LoginComponent },
  { path: 'account',        component: AccountComponent, canActivate: [ AuthGuardService ] },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
