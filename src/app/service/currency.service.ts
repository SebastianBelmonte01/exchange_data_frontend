import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Currency} from "../models/Currency";
import {CurrencyStore} from "../store/currencyStore";
import {ApiResponse} from "../models/ApiResponse";
import {PaginationData} from "@ngneat/elf-pagination";
import {Paginator} from "../models/paginator";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  BACKEND_URL = environment.BACKEND_URL;

  BASE_URL = `${this.BACKEND_URL}/api/v1/exchange`;

  constructor(private http: HttpClient, private currencyStore: CurrencyStore) {
  }

  getAllCurrencies() {
    return this.http.get<ApiResponse<Currency[]>>(`${this.BASE_URL}/all`)
      .pipe(
        tap((response) =>
          this.currencyStore.setCurrencies(response.response),
        ),
      );

  }

  deleteCurrency(id: number){
    console.log('deleteCurrency Service');
    this.currencyStore.deleteCurrency(id);
    return this.http.delete<ApiResponse<Currency>>(`${this.BASE_URL}/delete?id=${id}`)
  }

  convertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
    console.log('convertCurrency Service');
    console.log(fromCurrency);
    console.log(toCurrency);
    console.log(amount);
    return this.http.post<Currency>(`${this.BASE_URL}/new?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, null)
  }

  editCurrency(newTo: string, newFrom: string, newAmount: number, id: number) {
    return this.http.put<ApiResponse<Currency>>(`${this.BASE_URL}/update?id=${id}&from=${newFrom}&to=${newTo}&amount=${newAmount}`, null).pipe(
        tap( (response) => {
          console.log('editCurrency Service');
          console.log(response);
          this.currencyStore.editCurrency(response.response.query.to, response.response.query.from, response.response.query.amount, response.response.id, response.response.result)
        })
    );
  }



  getPageableCurrencies(page: number): Observable<PaginationData & { data: Currency[] }> {
    return this.http.get<ApiResponse<Paginator<Currency>>>(`${this.BASE_URL}/user/all?page=${page}&size=5`).pipe(
      tap(response => console.log('Received JSON:', response)),
      map((response: ApiResponse<Paginator<Currency>>) => {
        const content = response.response?.content || [];
        return {
          currentPage: page + 1,
          perPage: 5,
          total: response.response?.totalElements || 0,
          lastPage: Math.ceil((response.response?.totalElements || 0) / 5),
          data: content
        };
      }),
      tap((paginationData) => {
        this.currencyStore.setPageableCurrencies(page + 1, paginationData);
      })
    );
  }
}
