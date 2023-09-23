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
import {
  PaginationData,
  selectCurrentPage,
  selectCurrentPageEntities,
  selectPaginationData, setCurrentPage, setPage, updatePaginationData,
  withPagination
} from "@ngneat/elf-pagination";



const currencyStore = createStore(
  {name: 'currencyStore'},
  withEntities<Currency>(),
  withPagination()
);


@Injectable({ providedIn: 'root' })
export class CurrencyStore{

  currencies$ = currencyStore.pipe(
    selectAllEntities(),
  );
  pageableCurrencies$ = currencyStore.pipe(
    selectCurrentPageEntities(),
  );
  currentPage$ = currencyStore.pipe(
    selectCurrentPage(),
  );
  paginationData$ = currencyStore.pipe(
    selectPaginationData(),
  );

    setCurrencies(currencies: Currency[]) {
      currencyStore.update(setEntities(currencies));
    }


    deleteCurrency(id: number) {
      console.log('deleteCurrency');
      console.log(id);
      currencyStore.update(deleteEntities(id));
    }

    editCurrency(newTo: string, newFrom: string, newAmount: number, id: number, result: number) {
    console.log("NEW ID");
    console.log(id)
    currencyStore.update(
      updateEntities(id, currency => ({
        ...currency,
        query: {
          ...currency.query,
          to: newTo,
          from: newFrom,
          amount: newAmount,
        },
        result: result,
        })
      )
    );
    }


  //   Currency Pageable Store methods
    setActivePage(id: Currency['id']) {
      currencyStore.update(setCurrentPage(id));
    }


  setPageableCurrencies(page: number, currencies: PaginationData & { data: Currency[] }) {
    const { data, ...pagination } = currencies;
    currencyStore.update(
      addEntities(data),
      updatePaginationData(pagination),
      setPage(
        page,
        data.map((c) => c.id)
      )
    );
  }













  }
