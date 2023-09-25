import {CurrencyHistoryComponent} from "../components/currency-history/currency-history.component";
import {CurrencyState} from "./CurrencyState";
import {SeenCurrencyState} from "./SeenCurrencyState";
import {tap} from "rxjs";

export class InitialCurrencyState implements CurrencyState {
  handleButtonClick(component: CurrencyHistoryComponent): void {
    component.isSeen = true;

    component.setState(new SeenCurrencyState());
  }
}
