import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceHttp } from '../SERVICES/data.service';
import { HandbookDataExt } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', './add-field.component.css']
})
export class AddFieldComponent implements OnInit {

  public valid = true;
  constructor(private router: Router, private dataService: DataServiceHttp) { }

  ngOnInit(): void {
  }
  onAdd(...params: string[]): void {
    const type = (params[1] === 'Дата') ? 'date' : 'string';
    this.dataService.addField(params[0], type, params[2]).subscribe(el => {
    });
      // this.router.navigate(['/insurance_types']);
    console.log(params);
  }
  debug(): void {
  }
}
