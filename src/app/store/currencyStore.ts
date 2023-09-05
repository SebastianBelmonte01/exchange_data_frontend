import { createStore, select } from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
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

    setCurrencies(currencies: Currency[]) {
      currencyStore.update(addEntities(currencies));
    }

  }
