import { Component, OnInit } from '@angular/core';

import { DataService } from '../SERVICES/data.service';
import { UserSessionService } from "../SERVICES/user-session.service";
import { IHandbookRow } from "../tsfiles/mock-table-data";

@Component({
  selector: 'app-insurance-types',
  templateUrl: './insurance-types.component.html',
  styleUrls: ['./insurance-types.component.css']
})

export class InsuranceTypesComponent implements OnInit {

  private tableData: IHandbookRow[] = [];
  private filteredData: IHandbookRow[] = [];
  displayData: IHandbookRow[] = [];
  currentUser?: string;
  currentRole?: string;
  info: string = '';
  tableNav  = { current: 1, total: 1, max: 1, rows: 10 }

  constructor(private dataService: DataService, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.currentUser = this.userSession.getCurrentUser();
    this.currentRole = this.userSession.getCurrentRole();
    this.tableData = this.dataService.getData().slice();
    this.filteredData = this.tableData;
    this.displayData = this.filteredData.slice(0, this.tableNav.rows);
    this.tableNav.max = Math.floor(this.filteredData.length / this.tableNav.rows) + 1;
    this.info = `Всего записей: ${this.filteredData.length}`;

    console.log('init insurance');

  }
  onSearchEnter(e: any): void {
    let text: string = e.target.value;
    if (text === '') {
      this.filteredData = this.tableData;
    } else {
      this.filteredData = this.tableData.filter(e => {
        if (e.fullname.search(new RegExp(text, 'i')) === -1) return false;
        else return true;
      });
    }
    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.info =`Найдено записей: ${this.filteredData.length}`;
    this.setDisplayData(1);
    console.log(`Enter: ${e.target.value}`);
  }
  onTableNavigation(type: string, page: string='0'): void {
    switch (type) {
      case 'top-left':
        this.setTablePage(1);
        break;
      case 'top-right':
        this.setTablePage(this.tableNav.max);
        break;
      case 'left':
        this.setTablePage(this.tableNav.current - 1);
        break;
      case 'right':
        this.setTablePage(this.tableNav.current + 1);
        break;
      case 'input':
        let p = parseInt(page);
        if (!isNaN(p)) this.setTablePage(p);
        console.log(`Page input: ${page}`);
        break;   
      }
    console.log(`Page: ${this.tableNav.current}`);
  }

  private setTablePage(val: number): void {
    // console.log('set table page');
    if (val < 1 || val > this.tableNav.max) return;
    else if (this.tableNav.current !== val) {      
      this.setDisplayData(val);
      console.log(`Set input to: ${this.tableNav.current}`);
    }
  }
  private setDisplayData(page: number): void {
    this.tableNav.current = page;
    let startIdx =  this.tableNav.rows * (page - 1);
    this.displayData = this.filteredData.slice(startIdx, startIdx + this.tableNav.rows);
  }
  public debug(): void {
    console.log(Date.now());
  }

}
