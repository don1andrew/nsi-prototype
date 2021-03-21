import { Injectable } from '@angular/core';

import { HandbookDataExt, HandbookRow, HandbookData } from '../tsfiles/mock-table-data-ext';

@Injectable({
  providedIn: 'root',
})

export class DataService {

    // private data!: HandbookData;

    getData(rows: number = 45): HandbookData {
        return HandbookDataExt.getData(rows);
    }
    addRecord(record: HandbookRow): void {
      HandbookDataExt.addRecord(record);
    }
    getRecord(id: number): HandbookRow | undefined {
      return HandbookDataExt.getRecord(id);
    }
    changeRecord(id: number | null, record: HandbookRow): void {
      if (id !== null ) { HandbookDataExt.changeRecord(id, record); }
    }
    deleteRecords(id: number[]): void {
      HandbookDataExt.deleteRecords(id);
    }
    addField(): void {
    }
    editField(): void {
    }
    getEmptyRow(): HandbookRow {
      // return { id: 0,
      //   fullname: '',
      //   recordStatus: '',
      //   code: '',
      //   recordStartDate: '',
      //   recordEndDate: '',
      //   codeEndDate: '',
      // };
      return [];
    }
    constructor() {}
}
