import { createStore, select } from '@ngneat/elf';
import {
  addEntities, deleteEntities, getEntity,
  selectAllEntities,
  selectAllEntitiesApply, selectEntity,
  updateEntities, withActiveId, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";
import {Currency} from "../models/Currency";
import {CurrencyService} from "../service/currency.service";



const currencyStore = createStore(
  {name: 'currencyStore'},
  withEntities<Currency>(),
  withActiveId()
);


@Injectable({ providedIn: 'root' })
export class CurrencyStore{

  currencies$ = currencyStore.pipe(selectAllEntities());
  selectedCurrency$ = currencyStore.query(getEntity(3));


    setCurrencies(currencies: Currency[]) {
      currencyStore.update(addEntities(currencies));
    }

    setSelectedCurrency(id: number) {
      console.log(id);
      currencyStore.query(getEntity(id));
      this.selectedCurrency$ = currencyStore.query(getEntity(id));
      console.log(this.selectedCurrency$);
    }

    deteleCurrency(id: number) {
      currencyStore.update(deleteEntities(id));
    }




  }
