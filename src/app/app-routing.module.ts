import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CurrencyHistoryComponent} from "./components/currency-history/currency-history.component";
import {CurrencyConverterComponent} from "./components/currency-converter/currency-converter.component";
import {AuthGuard} from "./security/auth-guard.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard] , data: { roles: ['user'] }},
  {path: 'history', component: CurrencyHistoryComponent},
  {path: 'converter', component: CurrencyConverterComponent},
  {path: 'NotFound', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
