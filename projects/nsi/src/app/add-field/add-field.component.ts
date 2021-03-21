import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../SERVICES/data.service';
import { HandbookDataExt } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', './add-field.component.css']
})
export class AddFieldComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }
  onAdd(...params: string[]): void {
    this.dataService.addField(params[0], params[1], params[2]);
    this.router.navigate(['/insurance_types']);
    console.log(params);
    // HandbookDataExt.debug();
  }
  debug(): void {
    // HandbookDataExt.changeRecord(3, ['3','547','streh','qwe123', 'qwe345', 'tyu567', '5687jj', '5g55g5g']);
  }
}
