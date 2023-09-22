import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Currency} from "../../models/Currency";
import {CurrencyService} from "../../service/currency.service";
import {CurrencyStore} from "../../store/currencyStore";

@Component({
  selector: 'app-currency-pageable',
  templateUrl: './currency-pageable.component.html',
  styleUrls: ['./currency-pageable.component.css']
})
export class CurrencyPageableComponent {

  currencyService: CurrencyService = Inject(CurrencyService);
  currencyStore: CurrencyStore = Inject(CurrencyStore);

  currencies$ = this.currencyStore.currencies$;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Currency> = new MatTableDataSource<Currency>([]);
  displayedColumns: string[] = ['id', 'from', 'to', 'amount', 'convertedCurrency', 'date'];
  maxSize: number = 0;

  // constructor() {
  //   this.currencyService.getConvertCurrencies(0, 5).subscribe();
  // }


  pageChangeEvent($event: PageEvent) {
    console.log($event);
    this.currencyService.getConvertCurrencies($event.pageIndex, 5).subscribe();
  }

}
