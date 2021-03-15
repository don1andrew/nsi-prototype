import { Component, OnInit } from '@angular/core';
// import { HandbookData } from '../tsfiles/mock-table-data';
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
    const hde: HandbookDataExt = new HandbookDataExt();
    hde.debug();
  }
}
