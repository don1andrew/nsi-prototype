import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../SERVICES/data.service';
import { HeaderData, Fields, HandbookRow } from '../tsfiles/mock-table-data-ext';
import { Validation } from '../tsfiles/validation';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css',
  './add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  public formFields = {
    code: '',
    fullName: '',
    startDate: '',
    endDate: '',
    codeDate: ''
  };
  public valid = false;
  // public parentId = '';
  public header: HeaderData[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.validate();
    this.header = this.dataService.getData().header;
  }

  onAdd(...params: string[]): void {
    this.dataService.addRecord([ params[Fields.id], params[Fields.parentId], params[Fields.fullname], params[Fields.recordStatus], 
      params[Fields.code], this.isoDateToCustom(params[Fields.recordStartDate]),
      this.isoDateToCustom(params[Fields.recordEndDate]), this.isoDateToCustom(params[Fields.codeEndDate]) ]);
    this.router.navigate(['/insurance_types']);

    // params.forEach(str => {
    //   console.log(str);
    // });
  }
  getRecords(): HandbookRow[] {
    return this.dataService.getData().body.slice();
  }
  validate(): void {
    this.valid = Validation.validate(this.formFields);
  }
  debug(el: HTMLSelectElement): void {
    console.log(el.selectedOptions[0].id);
  }
  private isoDateToCustom(date: string = '1900-01-01'): string {
    return new Date(date + 'T00:00:00').toLocaleDateString();
  }

}
