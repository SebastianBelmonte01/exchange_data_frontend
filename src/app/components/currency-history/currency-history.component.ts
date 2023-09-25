import {Component, inject, OnInit} from '@angular/core';
import {CurrencyService} from "../../service/currency.service";
import {Currency} from "../../models/Currency";
import {CurrencyStore} from "../../store/currencyStore";
import {DialogService} from "../../service/dialog/dialog.service";
import {KeycloakService} from "keycloak-angular";
import {CurrencyState} from "../../state/CurrencyState";
import {InitialCurrencyState} from "../../state/InitialCurrencyState";

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.css']
})
export class CurrencyHistoryComponent{

  displayedColumns: string[] = ['id', 'date', 'amount', 'from', 'to', 'result', 'actions'];

  currencyService: CurrencyService  = inject(CurrencyService);
  currencies$ = this.currencyStore.currencies$;

  edit: boolean = false;


  id: number = 0;
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BOB'];

//   State Design Pattern

  private state: CurrencyState = new InitialCurrencyState();

  isSeen = true;


constructor(public currencyStore: CurrencyStore, private _dialog: DialogService, private keycloakService: KeycloakService) {
    console.log('constructor');
    this.currencyService.getAllCurrencies().subscribe();

  }

  ngOnInit() {
    console.log('ngOnInit');
    this.currencyService.getAllCurrencies().subscribe();
    // .subscribe((response) => {
    //   console.log(response);
    //   const currencyProps = this.currencyStore.getCurrencyProps();
    //   console.log('currencyProps');
    //   console.log(currencyProps);
    //   console.log(this.dataSource);
    // });
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
    console.log('editCurrency');
    this.currencyService.editCurrency(this.toCurrency ,this.fromCurrency, this.amount, this.id).subscribe();
    this.edit = !this.edit;
  }

  logout() {
    this.keycloakService.logout();
  }

//   State Design Pattern

  setState(newState: CurrencyState) {
    this.state = newState;
  }

  handleButtonClick() {
    this.state.handleButtonClick(this);
  }

}
