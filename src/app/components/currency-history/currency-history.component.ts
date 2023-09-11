import {Component, inject, OnInit} from '@angular/core';
import {CurrencyService} from "../../service/currency.service";
import {Currency} from "../../models/Currency";
import {CurrencyStore} from "../../store/currencyStore";
import {DialogService} from "../../service/dialog/dialog.service";

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
  edit: boolean = false;


  id: number = 0;
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BOB'];





  constructor(public currencyStore: CurrencyStore, private _dialog: DialogService) {
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

  openDialog(currency: Currency) {
    this._dialog.open(currency);
  }

  deleteCurrency(id: number) {
    this.currencyService.deleteCurrency(id).subscribe();
  }


  showCurrencyConfig(currency: Currency) {
      this.edit = !this.edit;
      this.id = currency.id;
      this.amount = currency.query.amount;
      this.fromCurrency = currency.query.from;
      this.toCurrency = currency.query.to;
  }

  editCurrency() {
    this.currencyService.editCurrency(this.toCurrency ,this.fromCurrency, this.amount, this.id).subscribe();
     this.edit = !this.edit;
  }

}
