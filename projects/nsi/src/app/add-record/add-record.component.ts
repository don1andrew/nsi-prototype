import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../SERVICES/data.service';
import { HeaderData } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css',
  './add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  public header: HeaderData[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.header = this.dataService.getData().header;
  }

  onAdd(...params: string[]): void {
    this.dataService.addRecord([ params[0], params[1], params[2], params[3], this.isoDateToCustom(params[4]),
      this.isoDateToCustom(params[5]), this.isoDateToCustom(params[6]) ]);
    this.router.navigate(['/insurance_types']);

    // params.forEach(str => {
    //   console.log(str);
    // });
  }
  private isoDateToCustom(date: string = '1900-01-01'): string {
    return new Date(date + 'T00:00:00').toLocaleDateString();
  }

}
