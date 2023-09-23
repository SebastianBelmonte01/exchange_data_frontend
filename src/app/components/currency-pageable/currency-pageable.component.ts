import {Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Currency} from "../../models/Currency";
import {CurrencyService} from "../../service/currency.service";
import {CurrencyStore} from "../../store/currencyStore";
import {switchMap} from "rxjs";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-currency-pageable',
  templateUrl: './currency-pageable.component.html',
  styleUrls: ['./currency-pageable.component.css']
})
export class CurrencyPageableComponent {


  currencies$ = this.currencyStore.pageableCurrencies$;
  paginationData$ = this.currencyStore.paginationData$;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: Currency[] = [];
  displayedColumns: string[] = ['id', 'from', 'to', 'amount', 'convertedCurrency', 'date'];

  constructor(private currencyService: CurrencyService, private currencyStore: CurrencyStore, private keycloakService: KeycloakService) {

  }
  ngOnInit() {
    console.log(this.currencies$)
    console.log('ngOnInit');
    console.log(this.currencyStore.currentPage$)
    this.currencyStore.currentPage$
      .pipe(
        switchMap((page) => this.currencyService.getPageableCurrencies(page - 1))
      )
      .subscribe();
  }




  pageChangeEvent($event: PageEvent) {
    console.log($event);
    this.currencyStore.setActivePage($event.pageIndex + 1);
  }

  logout() {
    this.keycloakService.logout();
  }

}
