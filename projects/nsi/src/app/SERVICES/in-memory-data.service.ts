import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { HandbookDataExt, HandbookRow, HandbookData, HeaderData } from '../tsfiles/mock-table-data-ext';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
    constructor() {}
    createDb() {
        const data: HandbookData = { header: [], body: [] };
        data.header[0] = { type: 'number', name: 'id', description: 'record\'s id'};
        data.header[1] = { type: 'number', name: 'parentId', description: 'record\'s parent id'};
        data.header[2] = { type: 'string', name: 'fullname', description: 'Полное наименование'};
        data.header[3] = { type: 'string', name: 'recordStatus', description: 'Статус записи'};
        data.header[4] = { type: 'string', name: 'code', description: 'Код РУФР'};
        data.header[5] = { type: 'date', name: 'recordStartDate', description: 'Дата начала действия записи'};
        data.header[6] = { type: 'date', name: 'recordEndDate', description: 'Дата окончания действия записи'};
        data.header[7] = { type: 'date', name: 'codeEndDate', description: 'Дата окончания действия кода'};

        data.body[0] = ['0', '', 'Record #1', 'New', 'IR_P', '01.02.2020', '02.02.2020', '04.05.2021'];
        data.body[1] = ['1', '', 'Record #2', 'New', 'IR_P', '01.02.2020', '02.03.2020', '03.05.2021'];
        data.body[2] = ['2', '1', 'Record #3', 'New', 'IR_P', '01.02.2020', '06.02.2020', '05.05.2021'];
        data.body[3] = ['3', '', 'Record #4', 'New', 'IR_P', '01.02.2020', '07.02.2020', '06.05.2021'];
        return {data};
    }
    // genId(data: HandbookData): number {
    //     return (parseInt(data.body.slice(-1)[0][0])+1);
    // }
}
