import {Component, inject, OnInit} from '@angular/core';
import {CurrencyService} from "../../service/currency.service";
import {Currency} from "../../models/Currency";

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.css']
})
export class CurrencyHistoryComponent implements OnInit{

  currencyHistory: CurrencyService = inject(CurrencyService);
  currencies: Currency[] = [];
  ngOnInit(): void {
    console.log("COMPONENT HISTORY INITIALIZED");

    this.currencyHistory.getAllCurrencies().subscribe(value => {
      console.log(value);
      this.currencies = value;
    });


  }

}
