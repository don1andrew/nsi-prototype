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
    deleteRecords(id: number[]): void {
      HandbookData.deleteRecords(id);
    }
    constructor () {}
}