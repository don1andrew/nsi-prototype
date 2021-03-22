export interface HeaderData {
  type: string;
  name: string;
  description: string;
}
export type HandbookRow = Array<string>;
export interface HandbookData {
  header: HeaderData[];
  body: HandbookRow[];
}
export enum Fields { id, fullname, recordStatus, code, recordStartDate, recordEndDate, codeEndDate }

export class HandbookDataExt {
  private static data: HandbookData = { header: [], body: [] };

  private static status: string[] = ['Опубликованная', 'Новая'];
  private static code: string[] = ['IC_PROP', 'IC_CTR_OP'];
  constructor() {
  }
  // like static constructor
  private static _init = (() => {
        HandbookDataExt.generateData();
  })();
  private static getMockDate(): string {
    return new Date(Date.now() - Math.random() * 20 * 365 * 24 * 60 * 60 * 1000 + 10 * 365 * 24 * 60 * 60 * 1000)
      .toLocaleDateString().replace('-', '.');
  }
  private static generateData(rowsCount: number = 45): void {
    this.data.header[0] = { type: 'number', name: 'id', description: 'record\'s id'};
    this.data.header[1] = { type: 'string', name: 'fullname', description: 'Полное наименование'};
    this.data.header[2] = { type: 'string', name: 'recordStatus', description: 'Статус записи'};
    this.data.header[3] = { type: 'string', name: 'code', description: 'Код РУФР'};
    this.data.header[4] = { type: 'date', name: 'recordStartDate', description: 'Дата начала действия записи'};
    this.data.header[5] = { type: 'date', name: 'recordEndDate', description: 'Дата окончания действия записи'};
    this.data.header[6] = { type: 'date', name: 'codeEndDate', description: 'Дата окончания действия кода'};
    this.data.body = [];
    for (let i = 0; i < rowsCount; i++) {
        const date: number = (Date.now() - Math.random()*20*365*24*60*60*1000+10*365*24*60*60*1000);
        this.data.body.push([
            i.toString(),
            `Запись справочника №${i + 1}`,
            this.status[Math.floor(Math.random() * 2)],
            this.code[Math.floor(Math.random() * 2)],
            new Date(date).toLocaleDateString(),
            new Date(date + Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            this.getMockDate(),
        ]);

      }
  }
  static getData(rowsCount: number): HandbookData {
    if (this.data.body.length === 0) {
      this.generateData(rowsCount);
    }
    return this.data;
  }
  static addRecord(record: HandbookRow): void {
    record[0] = (this.data.body.slice(-1)[0][0]+1).toString();
    this.data.body.push(record);
    // console.log(this.data);
  }
  static getRecord(id: number): HandbookRow {
    const idx = this.data.body.findIndex(el => el[0] === id.toString());
    return this.data.body[idx];
  }
  static editRecord(id: number, record: HandbookRow): void {
    // this.getRecord(id).copyWithin = record.slice();
    Object.assign(this.getRecord(id), record);
  }
  static deleteRecords(id: number[]): void {
    console.log(id);
    for (let idx = this.data.body.length-1; idx >= 0; idx--) {
      if (id.includes(parseInt(this.data.body[idx][0]))) {
          console.log(`found id: ${this.data.body[idx][0]}, length: ${this.data.body.length}`);
          this.data.body.splice(idx, 1);
      }
    }
  }
  static getField(id: number): HeaderData {
    return Object.assign({}, this.data.header[id]);
  }
  static addField(name: string, type: string, description: string): void {
    this.data.header.push({
      name: name,
      type: type,
      description: description
    });
    this.data.body.forEach(e => e.push('default'));
  }
  static editField(id: number, field: HeaderData) {
    this.data.header[id].description = field.description;
  }
  static deleteField(id: number): void {
    this.data.header.splice(id, 1);
    this.data.body.forEach(e => e.splice(id, 1));
  }
  static debug(): void {
    console.log(this.data);
    // console.log(`record: ${this.getRecord(2)}`);
  }
}
