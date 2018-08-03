import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/components/home/home.component';
import { HeaderComponent } from './header/components/header/header.component';
import { LoginComponent } from './account/components/login/login.component';
import { AccountComponent } from './account/components/account/account.component';
import { DialogPanelComponent } from './shared/components/dialog-panel/dialog-panel.component';

import { HeaderService } from './header/services/header.service';
import { AuthService } from './account/services/auth.service';
import { AuthGuardService } from './account/services/auth-guard.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AccountComponent,
    DialogPanelComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    DialogPanelComponent,
  ],
  providers: [
    HeaderService,
    AuthService,
    AuthGuardService,
  ],
  entryComponents: [
    DialogPanelComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
