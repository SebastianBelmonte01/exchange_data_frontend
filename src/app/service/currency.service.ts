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
    return this.http.get<ApiResponse<Currency[]>>('http://localhost:8080/api/v1/exchange/all')
      .pipe(
        tap((response) =>
          this.currencyStore.setCurrencies(response.response),
        ),
        trackRequestResult(['currencies'], {skipCache: true})
      );

  }

  deleteCurrency(id: number){
    console.log('deleteCurrency Service');
    this.currencyStore.deleteCurrency(id);
    return this.http.delete<ApiResponse<Currency>>(`http://localhost:8080/api/v1/exchange?id=${id}`)
  }
}
