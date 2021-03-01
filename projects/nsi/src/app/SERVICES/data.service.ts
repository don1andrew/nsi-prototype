import { Injectable } from '@angular/core';

import { HandbookData, IHandbookRow } from '../tsfiles/mock-table-data'

@Injectable({
  providedIn: 'root',
})

export class DataService {
    // private 

    private data!: HandbookData;

    getData(rows: number = 45): IHandbookRow[] {
        return HandbookData.getData(rows);
    }
    constructor () {}
}