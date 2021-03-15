interface HeaderData {
  type: string;
  name: string;
  description: string;
}
type HandbookRow = Array<string>;
interface HandbookData {
  header: HeaderData[];
  body: HandbookRow[];
}
// export interface IHandbookRowExt {
// }

export class HandbookDataExt {
  private data: HandbookData = { header: [], body: [] };

  constructor() {
    this.generateData();
  }

  private generateData(rowsCount: number = 45): void {
    this.data.header.push({ type: 'number', name: 'id', description: 'record\'s id'});
    this.data.header.push({ type: 'string', name: 'name', description: 'record\'s name'});

    this.data.body[0] = ['0', 'foo'];
    this.data.body[1] = ['1', 'bar'];
    this.data.body[2] = ['2', 'lol'];
    this.data.body[3] = ['3', 'hah'];
  }
  getData(): HandbookData {
    return this.data;
  }
  addRecord(record: HandbookRow): void {
    return;
  }
  getRecord(id: number): HandbookRow {
    const idx = this.data.body.findIndex(el => el[0] === id.toString());
    return this.data.body[idx];
  }
  changeRecord(id: number, record: HandbookRow): void {
    return;
  }
  deleteRecords(id: number[]): void {
    return;
  }
  debug(): void {
    console.log(this.data);
    console.log(`record: ${this.getRecord(2)}`);
  }
}
