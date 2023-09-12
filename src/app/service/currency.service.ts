import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Currency} from "../models/Currency";
import {CurrencyStore} from "../store/currencyStore";
import {ApiResponse} from "../models/ApiResponse";
import { trackRequestResult } from '@ngneat/elf-requests';



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient, private currencyStore: CurrencyStore) {
  }

  getAllCurrencies() {
    return this.http.get<ApiResponse<Currency[]>>('http://localhost:8081/api/v1/exchange/all')
      .pipe(
        tap((response) =>
          this.currencyStore.setCurrencies(response.response),
        ),
        // trackRequestResult(['currencies'], {skipCache: true})
        trackRequestResult(['currencies'], { additionalKeys: currencies => currencies.response.map(currency => (['currencies', currency.id])), skipCache: true })

      );

  }

  deleteCurrency(id: number){
    console.log('deleteCurrency Service');
    this.currencyStore.deleteCurrency(id);
    return this.http.delete<ApiResponse<Currency>>(`http://localhost:8081/api/v1/exchange?id=${id}`)
  }

  convertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
    console.log('convertCurrency Service');
    console.log(fromCurrency);
    console.log(toCurrency);
    console.log(amount);
    return this.http.post<Currency>(`http://localhost:8081/api/v1/exchange?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, null)
  }

  editCurrency(newTo: string, newFrom: string, newAmount: number, id: number) {
    console.log('editCurrency Service');
    console.log(newTo);
    console.log(newFrom);
    return this.http.put<Currency>(`http://localhost:8081/api/v1/exchange?id=${id}&from=${newFrom}&to=${newTo}&amount=${newAmount}`, null)
      .pipe(
        tap((response) =>
          this.currencyStore.editCurrency(newTo, newFrom, newAmount, id)
        ),
        // trackRequestResult(['currencies'], {skipCache: true})

      );
  }
}
