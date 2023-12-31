import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CurrencyHistoryComponent } from './components/currency-history/currency-history.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CurrencyPageableComponent } from './components/currency-pageable/currency-pageable.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppAuthGuard} from "./security/auth-guard.guard";
import { HomeComponent } from './components/home/home.component';
import {HomeGuard} from "./security/home.guard";
import {environment} from "../environments/environment";


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOACK_URL,
        realm: 'prove',
        clientId: 'currency-web'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CurrencyHistoryComponent,
    DialogComponent,
    CurrencyConverterComponent,
    NotFoundComponent,
    CurrencyPageableComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    KeycloakAngularModule,
    MatPaginatorModule
  ],
  providers: [
    AppAuthGuard,
    HomeGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
