import {Component, Inject, Input} from '@angular/core';
import {DialogService} from "../../service/dialog/dialog.service";
import {Currency} from "../../models/Currency";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Currency) {}


}
