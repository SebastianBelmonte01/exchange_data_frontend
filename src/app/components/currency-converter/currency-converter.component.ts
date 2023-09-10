import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {CurrencyService} from "../../service/currency.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],


})
export class CurrencyConverterComponent {

  currencyService = inject(CurrencyService);

  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'BOB']; // Agrega más monedas según sea necesario


  convertCurrency() {
    this.currencyService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount)
      .subscribe((response) => {
        //TODO fix undefined problem on result
        console.log(response);
        this.result = response.result;
      });
  }

}
