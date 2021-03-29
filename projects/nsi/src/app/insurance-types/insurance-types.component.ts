import { AfterViewChecked, Component, OnChanges, OnInit } from '@angular/core';

import { DataServiceHttp } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { HandbookData, HandbookRow, HeaderData, Fields } from '../tsfiles/mock-table-data-ext';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-insurance-types',
  templateUrl: './insurance-types.component.html',
  styleUrls: ['./insurance-types.component.css']
})

export class InsuranceTypesComponent implements OnInit {

  tableHeader: HeaderData[] = [];
  private tableData: HandbookRow[] = [];
  private filteredData: HandbookRow[] = [];

  displayData: HandbookRow[] = [];
  session = { currentUser: '', currentRole: '', };
  info = '';
  tableNav  = { current: 1, total: 1, max: 1, rows: 10 };
  filters = {
    recordStatus: 'Все',
    codeStatus: 'Все',
    changedFrom: '',
    changedTo: '',
    activeFrom: '',
    activeTo: '',
  };
  buttonsDisabled = { edit: true, remove: true };
  confirmPopup =  false;



  constructor(private http: HttpClient, private dataService: DataServiceHttp, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.session.currentUser = this.userSession.getCurrentUser();
    this.session.currentRole = this.userSession.getCurrentRole();
    let data!: HandbookData;
    this.dataService.getData().subscribe(d => {
      data = d;
      this.tableHeader = d.header.slice();
      this.tableData = d.body.slice();
      this.filteredData = this.tableData;
      this.displayData = this.filteredData.slice(0, this.tableNav.rows);
      this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
      this.info = `Всего записей: ${this.filteredData.length}`;

      console.log('init insurance');
      console.log(this.filteredData);
    });
  }
  onApplyFilters(): void {
    console.log(this.filters);
    this.filteredData = this.tableData;

    // record
    if (this.filters.recordStatus !== 'Все') {
      this.filteredData = this.filteredData
      .filter(e => (e[Fields.recordStatus] === this.filters.recordStatus));
    }

    // code
    if (this.filters.codeStatus !== 'Все') {
      this.filteredData = this.filteredData
      .filter(e => {
        if ('Введен' === this.filters.codeStatus) {
          return (1 === this.compareDateStringToNow(e[Fields.codeEndDate]));
        }
        if ('Закрыт' === this.filters.codeStatus) {
          return (-1 === this.compareDateStringToNow(e[Fields.codeEndDate]));
        }
        return false;
      });
    }

    // record period
    if (this.filters.activeFrom !== '') {
      this.filteredData = this.filteredData.filter(e => {
        return (new Date(this.filters.activeFrom + 'T00:00:00').getTime() <=
          this.dateFromCustomString(e[Fields.recordStartDate]).getTime());
      });
    }
    if (this.filters.activeTo !== '') {
      this.filteredData = this.filteredData.filter(e => {
        return (new Date(this.filters.activeTo + 'T00:00:00').getTime() >=
          this.dateFromCustomString(e[Fields.recordEndDate]).getTime());
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
    const text: string = e.target.value;
    if (text === '') {
      this.filteredData = this.tableData;
      this.info = `Всего записей: ${this.filteredData.length}`;
    } else {
      this.filteredData = this.tableData.filter(elem => {
        return elem[Fields.fullname].search(new RegExp(text, 'i')) !== -1;
      });
      this.info = `Найдено записей: ${this.filteredData.length}`;
    }
    this.tableNav.max = Math.ceil(this.filteredData.length / this.tableNav.rows);
    this.setDisplayData(1);
    // // console.log(`Enter: ${e.target.value}`);
  }


  onRemove(): void {
    this.confirmPopup = true;
  }
  removeRecords(): void {
    const ch = document.querySelectorAll('[type="checkbox"]:checked');
    const rm: number[] = [];
    ch.forEach(element => {
      rm.push(parseInt(element.id, 10));
    });
    // this.dataService.deleteRecords(rm);
    this.ngOnInit();
    this.buttonsDisabled = { edit: true, remove: true };
    this.setTablePage(this.tableNav.current);
  }
  onEditClick(): void {
    const ch = document.querySelector('[type="checkbox"]:checked');
    // @ts-ignore
    this.userSession.passRecordId(+ch.id);
  }
  onEditField(id: number): void {
    this.userSession.passFieldId(id);
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
        const p = parseInt(page, 10);
        if (!isNaN(p)) { this.setTablePage(p); }
        console.log(`Page input: ${page}`);
        break;

    }
    // console.log(`Page: ${this.tableNav.current}`);
  }

  private setTablePage(val: number): void {
    console.log(`table page curent: ${this.tableNav.current}, set to ${val}`);
    if (val < 1) { val = 1; }
    if (val > this.tableNav.max) { val = this.tableNav.max; }
    // if (val < 1 || val > this.tableNav.max) return;
    this.setDisplayData(val);

    // if (this.tableNav.current !== val) {
      // console.log(`Set input to: ${this.tableNav.current}`);
    // }
  }
  private setDisplayData(page: number): void {
    this.tableNav.current = page;
    const startIdx =  this.tableNav.rows * (page - 1);
    this.displayData = this.filteredData.slice(startIdx, startIdx + this.tableNav.rows);
  }
  // 1 future, -1 past
  // noinspection JSMethodCanBeStatic
  private compareDateStringToNow(tdate: string): number {
    const d: number = new Date(parseInt(tdate.substring(6, 10), 10), parseInt(tdate.substring(3, 7), 10) - 1,
    parseInt(tdate.substring(0, 2), 10)).getTime();

    if (d === Date.now()) { return 0; }
    else if (d > Date.now()) { return 1; }
    else { return -1; }

  }
  // noinspection JSMethodCanBeStatic
  private dateFromCustomString(date: string): Date {
    return new Date(parseInt(date.substring(6, 10), 10), parseInt(date.substring(3, 7), 10) - 1,
    parseInt(date.substring(0, 2), 10));
  }
  private updateButtons(): void {
    const c = document.querySelectorAll('[type="checkbox"]:checked');
    // console.log(c);
    this.buttonsDisabled.edit = c.length !== 1;
    this.buttonsDisabled.remove = c.length === 0;
  }
  public debug(): void {
    const d = {};
    // this.dataService.getDataHttp().subscribe(el => { console.log(el); });
    // this.dataService.getRecordHttp(1).subscribe(el => console.log(el));
    // this.dataService.testHttp(0).subscribe(el => console.log(el));
  }

}
