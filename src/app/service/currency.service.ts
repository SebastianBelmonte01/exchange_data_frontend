import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "../models/Currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Currency[]>{
    return this.http.get<Currency[]>('http://localhost:8080/api/v1/exchange/all');
  }
}
