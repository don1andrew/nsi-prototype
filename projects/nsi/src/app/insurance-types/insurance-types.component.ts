import { AfterViewChecked, Component, OnChanges, OnInit } from '@angular/core';

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
  session = { currentUser: '', currentRole: '', };
  info: string = '';
  tableNav = { current: 1, total: 1, max: 1, rows: 10 };
  filters = {
    recordStatus: 'Все',
    codeStatus: 'Все',
    changedFrom: '',
    changedTo: '',
    activeFrom: '',
    activeTo: '',
  };
  buttonsDisabled = { edit: true, remove: true }

  constructor(private dataService: DataService, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.session.currentUser = this.userSession.getCurrentUser();
    this.session.currentRole = this.userSession.getCurrentRole();
    this.tableData = this.dataService.getData().slice();
    this.filteredData = this.tableData;
    this.displayData = this.filteredData.slice(0, this.tableNav.rows);
    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.info = `Всего записей: ${this.filteredData.length}`;

    console.log('init insurance');

  }
  onApplyFilters(): void {
    console.log(this.filters);
    this.filteredData = this.tableData;

    // record
    if (this.filters.recordStatus != 'Все') {
      this.filteredData = this.filteredData
        .filter(e => { return (e.recordStatus === this.filters.recordStatus) ? true : false; });
    }

    // code
    if (this.filters.codeStatus != 'Все') {
      this.filteredData = this.filteredData
        .filter(e => {
          if ('Введен' === this.filters.codeStatus) {
            return (1 == this.compareDateStringToNow(e.codeEndDate)) ? true : false;
          }
          if ('Закрыт' === this.filters.codeStatus) {
            return (-1 == this.compareDateStringToNow(e.codeEndDate)) ? true : false;
          }
          return false;
        });
    }

    // record period
    if (this.filters.activeFrom != '') {
      this.filteredData = this.filteredData.filter(e => {
        return (new Date(this.filters.activeFrom + 'T00:00:00').getTime() <=
          this.dateFromCustomString(e.recordStartDate).getTime()) ? true : false;
      });
    }
    if (this.filters.activeTo != '') {
      this.filteredData = this.filteredData.filter(e => {
        return (new Date(this.filters.activeTo + 'T00:00:00').getTime() >=
          this.dateFromCustomString(e.recordEndDate).getTime()) ? true : false;
      });
    }

    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.setDisplayData(1);
    this.info = `Найдено записей: ${this.filteredData.length}`;
  }
  onClearFilters(): void {
    // for (let e in this.filters) {
    //   (<any>this.filters)[e as keyof any] = '';
    // }
    this.filters = {
      recordStatus: 'Все',
      codeStatus: 'Все',
      changedFrom: '',
      changedTo: '',
      activeFrom: '',
      activeTo: '',
    };
    this.filteredData = this.tableData;
    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.setDisplayData(1);
    this.info = `Всего записей: ${this.filteredData.length}`;
  }
  onSearchEnter(e: any): void {
    let text: string = e.target.value;
    if (text === '') {
      this.filteredData = this.tableData;
      this.info = `Всего записей: ${this.filteredData.length}`;
    } else {
      this.filteredData = this.tableData.filter(e => {
        if (e.fullname.search(new RegExp(text, 'i')) === -1) return false;
        else return true;
      });
      this.info = `Найдено записей: ${this.filteredData.length}`;
    }
    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.setDisplayData(1);
    // console.log(`Enter: ${e.target.value}`);
  }

  onRemove(elem: HTMLTableSectionElement): void {
    const ch = document.querySelectorAll('[type="checkbox"]:checked');
    let rm: number[] = [];
    ch.forEach(element => {
      rm.push(parseInt(element.id));
    });
    this.dataService.deleteRecords(rm);
    this.ngOnInit();
    this.buttonsDisabled = { edit: true, remove: true };
    this.setTablePage(this.tableNav.current);
  }
  onEditClick(): void {
    const ch = document.querySelector('[type="checkbox"]:checked');
    this.userSession.passRecordId(parseInt(ch!.id));
  }
  onCheckboxChange(): void {
    this.updateButtons();
  }
  onTableNavigation(type: string, page: string = '0'): void {
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
    // console.log(`Page: ${this.tableNav.current}`);
  }

  private setTablePage(val: number): void {
    console.log(`table page curent: ${this.tableNav.current}, set to ${val}`);
    if (val < 1) val=1;
    if (val > this.tableNav.max) val = this.tableNav.max;
    // if (val < 1 || val > this.tableNav.max) return;
    this.setDisplayData(val);

    // if (this.tableNav.current !== val) {
      // console.log(`Set input to: ${this.tableNav.current}`);
    // }
  }
  private setDisplayData(page: number): void {
    this.tableNav.current = page;
    let startIdx = this.tableNav.rows * (page - 1);
    this.displayData = this.filteredData.slice(startIdx, startIdx + this.tableNav.rows);
    
  }
  // 1 future, -1 past
  private compareDateStringToNow(tdate: string): number {
    let d: number = new Date(parseInt(tdate.substring(6, 10)), parseInt(tdate.substring(3, 7)) - 1,
      parseInt(tdate.substring(0, 2))).getTime();

    if (d === Date.now()) return 0;
    else if (d > Date.now()) return 1;
    else return -1;

  }
  private dateFromCustomString(date: string): Date {
    return new Date(parseInt(date.substring(6, 10)), parseInt(date.substring(3, 7)) - 1,
      parseInt(date.substring(0, 2)));
  }
  private updateButtons(): void {
    const c = document.querySelectorAll('[type="checkbox"]:checked');
    // console.log(c);
    this.buttonsDisabled.edit = c.length !== 1;
    this.buttonsDisabled.remove = c.length === 0;
  }
  public debug(): void {
    const c = document.querySelectorAll('[type="checkbox"]:checked');
    console.log(c, this.buttonsDisabled);
  }

}
