import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { HandbookRow, Fields, HeaderData } from '../tsfiles/mock-table-data-ext';
import { Validation } from '../tsfiles/validation';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', '../add-record/add-record.component.css', './edit-record.component.css']
})
export class EditRecordComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private dataService: DataService,
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

  ngOnInit(): void {
    this.header = this.dataService.getData().header;
    const id = this.userSession.getRecordId();
    if (id !== null) {
      this.currentRecord = Object.assign({}, this.dataService.getRecord(id));
      this.currentRecord[Fields.recordStartDate] = this.customDateToISO(this.currentRecord[Fields.recordStartDate]);
      this.currentRecord[Fields.recordEndDate] = this.customDateToISO(this.currentRecord[Fields.recordEndDate]);
      this.currentRecord[Fields.codeEndDate] = this.customDateToISO(this.currentRecord[Fields.codeEndDate]);

    }
    

  }
  ngAfterViewInit(): void {
    const c = document.querySelector(`option[id="${this.currentRecord[Fields.parentId]}"]`);
    c?.setAttribute("selected", "selected");
    console.log(c);
  }

  onEdit(...params: string[]): void {
    this.currentRecord[Fields.parentId] = params[Fields.parentId];
    const rec = Object.assign({}, this.currentRecord);
    rec[Fields.recordStartDate] = this.isoDateToCustom(rec[Fields.recordStartDate]);
    rec[Fields.recordEndDate] = this.isoDateToCustom(rec[Fields.recordEndDate]);
    rec[Fields.codeEndDate] = this.isoDateToCustom(rec[Fields.codeEndDate]);
    this.dataService.editRecord(this.userSession.getRecordId(), rec);
    this.router.navigate(['/insurance_types']);
  }
  getRecords(): HandbookRow[] {
    return this.dataService.getData().body.slice().filter(e => (
      e[Fields.id] !== this.currentRecord[Fields.id]
    ));
  }
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
