import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CurrencyHistoryComponent} from "./components/currency-history/currency-history.component";
import {CurrencyConverterComponent} from "./components/currency-converter/currency-converter.component";
import {AppAuthGuard} from "./security/auth-guard.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {CurrencyPageableComponent} from "./components/currency-pageable/currency-pageable.component";
import {HomeComponent} from "./components/home/home.component";
import {HomeGuard} from "./security/home.guard";

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AppAuthGuard] ,
    data: { roles: ['ADMIN']}
  },
  {
    path: 'history',
    component: CurrencyHistoryComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'converter',
    component: CurrencyConverterComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'user/currency/all',
    component: CurrencyPageableComponent,
    canActivate: [AppAuthGuard],
    data: { roles: ['USER'] }
  },
  {
    path: 'NotFound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//
// const routes: Routes = [{
//   path: '',
//   component: CurrencyExchangeComponent,
//   canActivate: [AppAuthGuard],
//   data: { roles: ['USER'] },
//   pathMatch: 'full'
// },
//   {
//     path: 'exchange-history',
//     component: CurrencyExchangeListComponent,
//     canActivate: [AppAuthGuard],
//     data: { roles: ['ADMIN'] },
//   },
//   {
//     path: 'error',
//     component: ErrorComponent,
//   },

// ]
