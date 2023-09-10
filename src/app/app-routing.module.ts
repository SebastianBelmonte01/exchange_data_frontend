import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CurrencyHistoryComponent} from "./components/currency-history/currency-history.component";
import {CurrencyConverterComponent} from "./components/currency-converter/currency-converter.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'history', component: CurrencyHistoryComponent},
  {path: 'converter', component: CurrencyConverterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
