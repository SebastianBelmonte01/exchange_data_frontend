import {createStore, select, setProps} from '@ngneat/elf';
import {
  addEntities, deleteEntities, getEntity,
  selectAllEntities,
  selectAllEntitiesApply, selectEntity, setEntities,
  updateEntities, withActiveId, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";
import {Currency} from "../models/Currency";
import {CurrencyService} from "../service/currency.service";
import {joinRequestResult} from "@ngneat/elf-requests";



const currencyStore = createStore(
  {name: 'currencyStore'},
  withEntities<Currency>(),
);


@Injectable({ providedIn: 'root' })
export class CurrencyStore{

  currencies$ = currencyStore.pipe(
    selectAllEntities(),
    joinRequestResult(['currencies'])
  );

  getCurrencyProps() {
    return currencyStore.query((state) => state);
  }


    setCurrencies(currencies: Currency[]) {
      //TODO need to understand how does it work
      currencyStore.update(setEntities(currencies));
      //Why should I use setProps
    }


    deleteCurrency(id: number) {
      console.log('deleteCurrency');
      console.log(id);
      currencyStore.update(deleteEntities(id));
    }





  }
