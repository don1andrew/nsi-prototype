import { Injectable } from '@angular/core';

import { HandbookDataExt, HandbookRow, HandbookData, HeaderData } from '../tsfiles/mock-table-data-ext';

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
    editRecord(id: number | null, record: HandbookRow): void {
      if (id !== null ) { HandbookDataExt.editRecord(id, record); }
    }
    deleteRecords(id: number[]): void {
      HandbookDataExt.deleteRecords(id);
    }
    getField(id: number): HeaderData {
      return HandbookDataExt.getField(id);
    }
    addField(name: string, type: string, description: string): void {
      HandbookDataExt.addField(name, type, description);
    }
    editField(id: number | null, field: HeaderData): void {
      if (id !== null ) { HandbookDataExt.editField(id, field); }
    }
    deleteField(id: number | null): void {
      if (id !== null ) { HandbookDataExt.deleteField(id); }
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
