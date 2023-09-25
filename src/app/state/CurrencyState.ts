import {CurrencyHistoryComponent} from "../components/currency-history/currency-history.component";

export interface CurrencyState {
  handleButtonClick(component: CurrencyHistoryComponent): void;
}
