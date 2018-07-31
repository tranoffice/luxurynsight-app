import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../account/services/auth.service';

@Injectable()
export class HeaderService {
  userFirstname: String = '';
  isVisible = true;

  constructor(
    private srvAuth: AuthService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    /** Scruter le changement de route pour définir les actions adéquates */
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        /** nouvelle route détectée */
        this.onRouteChange(evt.url);
      }
    });

    /** Scruter les changements d'informations sur le compte */
    this.srvAuth.userLogged.subscribe( acc => {
      /** modification détectée : inscrire le firstname */
      this.userFirstname = acc.firstname;
    });
  }

  onRouteChange( newURL ) {
    const ROUTE_DETAIL = newURL.split('/');
    this.isVisible = true;

    switch (ROUTE_DETAIL[1]) {
      case 'login':
        /** pour la vue Login : masquer la barre Header */
        this.isVisible = false;
        break;
      default:
        break;
    }
  }
}
