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
    return this.http.post<Currency>(`http://localhost:8081/api/v1/exchange/new?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, null)
  }

  editCurrency(newTo: string, newFrom: string, newAmount: number, id: number) {
    return this.http.put<ApiResponse<Currency>>(`http://localhost:8081/api/v1/exchange?id=${id}&from=${newFrom}&to=${newTo}&amount=${newAmount}`, null).pipe(
        tap( (response) => {
          console.log('editCurrency Service');
          console.log(response);
          this.currencyStore.editCurrency(response.response.query.to, response.response.query.from, response.response.query.amount, response.response.id, response.response.result)
        })
    );
  }

  getConvertCurrencies(page: number, size: number) {
    return this.http.get<ApiResponse<Currency[]>>(`http://localhost:8081/api/v1/exchange/user/all?page=${page}&size=${size}`)
      .pipe(
        tap((response) =>
          this.currencyStore.setCurrencies(response.response),

        ),
        trackRequestResult(['currencies'], {skipCache: false})
      );
  }
}
