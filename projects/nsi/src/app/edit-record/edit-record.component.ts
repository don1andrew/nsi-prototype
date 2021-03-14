import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { IHandbookRow } from '../tsfiles/mock-table-data';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css',
  '../add-record/add-record.component.css', './edit-record.component.css']
})
export class EditRecordComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, 
    private userSession: UserSessionService) { }

    public currentRecord: IHandbookRow = this.dataService.getEmptyRow();
    

  ngOnInit(): void {
    const id = this.userSession.getRecordId();
    if (id !== null) {
      this.currentRecord = Object.assign({}, this.dataService.getRecord(id));
      this.currentRecord.recordStartDate = this.customDateToISO(this.currentRecord.recordStartDate);
      this.currentRecord.recordEndDate = this.customDateToISO(this.currentRecord.recordEndDate);
      this.currentRecord.codeEndDate = this.customDateToISO(this.currentRecord.codeEndDate);

    }
    console.log(this.currentRecord);

  }

  onEdit(...params: string[]): void {
    var rec = Object.assign({}, this.currentRecord);
    rec.recordStartDate = this.isoDateToCustom(rec.recordStartDate);
    rec.recordEndDate = this.isoDateToCustom(rec.recordEndDate);
    rec.codeEndDate = this.isoDateToCustom(rec.codeEndDate);
    this.dataService.changeRecord(this.userSession.getRecordId(), rec);
    this.router.navigate(['/insurance_types']);
  }
  private customDateToISO(date: string): string {
    return new Date(parseInt(date.substring(6, 10)), parseInt(date.substring(3, 7)) - 1,
        parseInt(date.substring(0, 2))).toISOString().substring(0,10);
  }
  private isoDateToCustom(date: string): string {
    return new Date(date + 'T00:00:00').toLocaleDateString();
  }
}
