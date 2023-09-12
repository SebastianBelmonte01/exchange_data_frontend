import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    console.log(this.authenticated)
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    console.log(requiredRoles)
    console.log(this.roles)

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0 || this.roles.includes('ADMIN')) {
      console.log('is Admin')
      console.log("RED")
      return true;
    }
    else {
      console.log('is not User')
      this.router.navigate(['/NotFound']);
      return false;
    }


    // Allow the user to proceed if all the required roles are present.
    //return requiredRoles.every((role) => this.roles.includes(role));


  }
}
