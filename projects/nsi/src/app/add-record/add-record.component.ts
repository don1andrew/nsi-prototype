import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IHandbookRow } from '../tsfiles/mock-table-data';
import { DataService } from '../SERVICES/data.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css',
  './add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onAdd(...params:string[]): void {
    this.dataService.addRecord({id: 0, fullname: params[2], code: params[1], codeEndDate: params[5], 
                                recordEndDate: params[4], recordStatus: 'Новая', recordStartDate: params[3]});
    this.router.navigate(['/insurance_types']);

    params.forEach(str => {
      console.log(str);
    });
  }

}
