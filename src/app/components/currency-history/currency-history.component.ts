import {Component, inject, OnInit} from '@angular/core';
import {CurrencyService} from "../../service/currency.service";
import {Currency} from "../../models/Currency";
import {CurrencyStore} from "../../store/currencyStore";

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.css']
})
export class CurrencyHistoryComponent{

  currencyService: CurrencyService  = inject(CurrencyService);

  constructor(public currencyStore: CurrencyStore) {

  }

  ngOnInit(): void {
    console.log("COMPONENT HISTORY INITIALIZED");
    this.currencyService.getAllCurrencies().subscribe();
    this.currencyService.setSelectedCurrency(3);
    this.currencyService.deleteCurrency(3).subscribe();
  }
}
