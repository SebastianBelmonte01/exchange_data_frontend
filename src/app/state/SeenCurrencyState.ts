import {CurrencyState} from "./CurrencyState";
import {CurrencyHistoryComponent} from "../components/currency-history/currency-history.component";
import {InitialCurrencyState} from "./InitialCurrencyState";

export class SeenCurrencyState implements CurrencyState {
  handleButtonClick(component: CurrencyHistoryComponent): void {
    component.isSeen = false;
    component.setState(new InitialCurrencyState());
  }
}
