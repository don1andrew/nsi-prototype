import { Component, OnInit } from '@angular/core';
import { HandbookDataExt } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', './add-field.component.css']
})
export class AddFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onAdd(...params: string[]): void {
    console.log('onAdd');
    HandbookDataExt.debug();
  }
  debug(): void {
    HandbookDataExt.changeRecord(3, ['3','547','streh','qwe123', 'qwe345', 'tyu567', '5687jj', '5g55g5g']);
  }
}
