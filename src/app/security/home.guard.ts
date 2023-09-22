
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable()
export class HomeGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected override keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login().catch((e) => console.error(e));
        return reject(false);
      }
      console.log(this.roles);
      if(this.roles.indexOf('ADMIN') > -1){
        this.router.navigate(['main']);
      }
      else if(this.roles.indexOf('USER') > -1){
        this.router.navigate(['user/currency/all']);
      }
    });
  }
}
