import { Injectable } from '@angular/core';

import { HandbookData, IHandbookRow } from '../tsfiles/mock-table-data'

@Injectable({
  providedIn: 'root',
})

export class DataService {

    // private data!: HandbookData;

    getData(rows: number = 45): IHandbookRow[] {
        return HandbookData.getData(rows);
    }
    addRecord(record: IHandbookRow): void {
      HandbookData.addRecord(record);
    }
    getRecord(id: number): IHandbookRow | undefined {
      return HandbookData.getRecord(id);
    }
    changeRecord(id: number | null, record: IHandbookRow): void {
      if (id !== null ) HandbookData.changeRecord(id, record);
    }
    deleteRecords(id: number[]): void {
      HandbookData.deleteRecords(id);
    }
    getEmptyRow(): IHandbookRow {
      return { id: 0,
        fullname: '',
        recordStatus: '',
        code: '',
        recordStartDate: '',
        recordEndDate: '',
        codeEndDate: '', 
      }
    }
    constructor () {}
}