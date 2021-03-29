import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HandbookDataExt, HandbookRow, HandbookData, HeaderData } from '../tsfiles/mock-table-data-ext';

@Injectable({
  providedIn: 'root',
})

export class DataService {
    private baseUrl = 'http://localhost:3003/';
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

    getDataHttp(): Observable<HandbookData> {
      return this.http.get<HandbookData>(`${this.baseUrl}api/data`)
        .pipe(
          tap(_ => console.log('http get data')),
          // catchError(this.hdl)
          // catchError(this.handleError<HandbookData>('get data', {header: [], body: []}))
        );
    }
    // catchError при ошибке подменяет неудачный Observable своим
    getRecordHttp(id: number): Observable<HandbookRow> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<HandbookRow>(url)
        .pipe(
          tap(_ => console.log('http get record')),
          // catchError(this.handleError<HandbookRow>(`get record ${id}`, []))
        );
    }
    testHttp(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}api/data`);
    }
    private hdl(): Observable<HandbookData> {
      return of({header: ['1', 'tets'], body: ['00', '0oo0o']} as unknown as HandbookData);
    }
    private handleError<T>(operation = 'operation', result: T): (err: any) => Observable<T>  {
      console.log('handle T'); // исполняется сразу при передаче функции как параметра
      return (err: any): Observable<T> => {
        console.log(`${operation} failed: ${err.toString()}`);
        return of(result as T);
      };
    }
    constructor(private http: HttpClient) {}
}
@Injectable({
  providedIn: 'root',
})
export class DataServiceHttp {
  private baseUrl = 'http://localhost:3003/';
  getData(): Observable<HandbookData> {
    return this.http.get<HandbookData>(`${this.baseUrl}api/data`)
      .pipe(
        tap(_ => console.log('http get data')),
        // catchError(this.handleError<HandbookData>('get data', {header: [], body: []}))
      );
  }
  addRecord(record: HandbookRow): Observable<any> {
    return this.http.post(`${this.baseUrl}api/data/record`, record)
      .pipe(
        tap(_ => console.log('http post data')),
        // catchError(this.handleError<HandbookRow>('add record', []));
      );
  }
  constructor(private http: HttpClient) {}
}
