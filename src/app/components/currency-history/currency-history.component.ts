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

  displayedColumns: string[] = ['id', 'date', 'amount', 'from', 'to', 'result', 'actions'];

  currencyService: CurrencyService  = inject(CurrencyService);
  currencies$ = this.currencyStore.currencies$;
  dataSource: Currency[] = [];
  isLoading: boolean = false;



  constructor(public currencyStore: CurrencyStore) {
    console.log('constructor');
    this.currencyService.getAllCurrencies().subscribe();

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.currencies$
      .subscribe((response) => {
        console.log(response);
        const currencyProps = this.currencyStore.getCurrencyProps();
        console.log('currencyProps');
        console.log(currencyProps);
        this.isLoading = response.isLoading;
        this.dataSource =  response.data;
        console.log(this.dataSource);
      });
  }

  deleteCurrency(id: number) {
    this.currencyService.deleteCurrency(id).subscribe();
  }

  protected readonly console = console;
}
