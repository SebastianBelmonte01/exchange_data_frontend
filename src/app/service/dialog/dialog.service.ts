import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {Currency} from "../../models/Currency";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open(data: Currency) {
    return this.dialog.open(DialogComponent, {
      data: data
    });
  }
}
