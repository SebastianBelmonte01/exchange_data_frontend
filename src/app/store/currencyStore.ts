import { createStore, select } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply, selectEntity,
  updateEntities, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";
import {Currency} from "../models/Currency";
import {CurrencyService} from "../service/currency.service";



const currencyStore = createStore(
  {name: 'currencyStore'},
  withEntities<Currency>()
);


@Injectable({ providedIn: 'root' })
export class CurrencyStore{

  currencies$ = currencyStore.pipe(selectAllEntities());
  // currency$ = currencyStore.pipe(selectEntity(Curre));


    setCurrencies(currencies: Currency[]) {
      currencyStore.update(addEntities(currencies));
    }

  setSelectedCurrency(currecySelectedId: number) {
      //Where should I store the selected currency?
      // this.currency$ = currencyStore.pipe(selectEntity(currecySelectedId));

      return currencyStore.pipe(selectEntity(currecySelectedId));
  }

  updateCurrency(id: number, newFrom: string, newTo: string, newAmount: number) {
    currencyStore.update(
        updateEntities(id, (entity) => ({
          ...entity,
            from: newFrom,
            to: newTo,
            amount: newAmount
        }))
    );
  }



  }
