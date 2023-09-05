import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Currency} from "../models/Currency";
import {CurrencyStore} from "../store/currencyStore";
import {ApiResponse} from "../models/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient, private currencyStore: CurrencyStore) { }

  getAllCurrencies(): Observable<Currency[]>{
    // return this.httpClient.get<ApiResponse<Cryptocurrency[]>>(this.API_URL).pipe(
    //     map((response: ApiResponse<Cryptocurrency[]>) => response.response || []),
    //     tap((cryptos) => this.cryptoRepository.setCryptos(cryptos))
    //
    return this.http.get<ApiResponse<Currency[]>>('http://localhost:8080/api/v1/exchange/all').pipe(
        map((response: ApiResponse<Currency[]>) => response.response || []),
        tap((currencies) => this.currencyStore.setCurrencies(currencies))
    );
  }
}
