import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceHttp } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { HandbookRow, Fields, HeaderData, HandbookData } from '../tsfiles/mock-table-data-ext';
import { Validation } from '../tsfiles/validation';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', '../add-record/add-record.component.css', './edit-record.component.css']
})
export class EditRecordComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private dataService: DataServiceHttp,
              private userSession: UserSessionService) { }

    // public currentRecord: IHandbookRow = this.dataService.getEmptyRow();
    public formFields = {
      code: '',
      fullName: '',
      startDate: '',
      endDate: '',
      codeDate: ''
    };
    public valid = false;
    public currentRecord: HandbookRow = [];
    public header: HeaderData[] = [];
    public body: HandbookRow[] = [];

    // общий observable, чтобы подписаться в двух разных местах
    private daObs?: Observable<HandbookData>;

  ngOnInit(): void {
    // запрашиваются все данные чтобы из списка можно было назначить родительскую
    this.daObs = this.dataService.getData();
    this.daObs.subscribe(d => {
      this.header = d.header;
      this.body = d.body;

      const id = this.userSession.getRecordId();
      if (id !== null) {
        const idx = this.body.findIndex(el => el[0] === id.toString());
        this.currentRecord = Object.assign([], this.body[idx]);
        // this.currentRecord = this.body[idx].slice();
        this.currentRecord[Fields.recordStartDate] = this.customDateToISO(this.currentRecord[Fields.recordStartDate]);
        this.currentRecord[Fields.recordEndDate] = this.customDateToISO(this.currentRecord[Fields.recordEndDate]);
        this.currentRecord[Fields.codeEndDate] = this.customDateToISO(this.currentRecord[Fields.codeEndDate]);

        this.body = this.body.filter(e => (
          e[Fields.id] !== this.currentRecord[Fields.id]
        ));
        console.log(this.body);
      }

    });

  }
  ngAfterViewInit(): void {
    this.daObs?.subscribe(d => {
      const c = document.querySelector(`option[id="${this.currentRecord[Fields.parentId]}"]`);
      c?.setAttribute('selected', 'selected');
      // console.log(c);
    });
  }

  onEdit(...params: string[]): void {
    this.currentRecord[Fields.parentId] = params[Fields.parentId];
    const rec = this.currentRecord.slice();
    // console.log(this.currentRecord);
    rec[Fields.recordStartDate] = this.isoDateToCustom(rec[Fields.recordStartDate]);
    rec[Fields.recordEndDate] = this.isoDateToCustom(rec[Fields.recordEndDate]);
    rec[Fields.codeEndDate] = this.isoDateToCustom(rec[Fields.codeEndDate]);
    console.log(rec);
    this.dataService.editRecord(this.userSession.getRecordId(), rec).subscribe(d => {
      console.log('record edited');
      this.router.navigate(['/insurance_types']);
    });
  }
  // getRecords(): HandbookRow[] {
  //   return this.dataService.getData().body.slice().filter(e => (
  //     e[Fields.id] !== this.currentRecord[Fields.id]
  //   ));
  // }
  private customDateToISO(date: string): string {
    return new Date(parseInt(date.substring(6, 10), 10), parseInt(date.substring(3, 7), 10) - 1,
        parseInt(date.substring(0, 2), 10) + 1).toISOString().substring(0, 10);
  }
  private isoDateToCustom(date: string): string {
    return new Date(date + 'T00:00:00').toLocaleDateString();
  }
  validate(): void {
    this.valid = Validation.validate({
      code: this.currentRecord[Fields.code],
      fullName: this.currentRecord[Fields.fullname],
      startDate: this.currentRecord[Fields.recordStartDate],
      endDate: this.currentRecord[Fields.recordEndDate],
      codeDate: this.currentRecord[Fields.codeEndDate],
    });
  }
  debug() {
    const c = document.querySelector(`option[id="${this.currentRecord[Fields.parentId]}"]`);
    c?.setAttribute("selected", "selected");
    console.log(c);
  }
}
