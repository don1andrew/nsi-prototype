export interface IHandbookRow {
    id: number;
    fullname: string;
    recordStatus: string;
    code: string;
    recordStartDate: string;
    recordEndDate: string;
    codeEndDate: string;
}

export class HandbookData {
    private static data: IHandbookRow[] = [];

    private static status: string[] = ['Опубликованная', 'Новая'];
    private static code: string[] = ['IC_PROP', 'IC_CTR_OP'];
    private static getMockDate(): string {
        return new Date(Date.now()-Math.random()*20*365*24*60*60*1000+10*365*24*60*60*1000).toLocaleDateString().replace('-','.');
    }
    private static generateData(rows: number): void {
        this.data = [];
        for (let i = 0; i < rows; i++) {
            let date: number = (Date.now()-Math.random()*20*365*24*60*60*1000+10*365*24*60*60*1000); 
            this.data.push({
                id: i,
                fullname: `Запись справочника №${i+1}`,
                recordStatus: this.status[Math.floor(Math.random()*2)],
                code: this.code[Math.floor(Math.random()*2)],
                recordStartDate: new Date(date).toLocaleDateString(),
                recordEndDate: new Date(date+Math.random()*5*365*24*60*60*1000).toLocaleDateString(),
                codeEndDate: this.getMockDate(),
            });

        }
    }

    public static getData(rows: number): IHandbookRow[] {
        if (this.data.length === 0) {
            this.generateData(rows);  
        }
        return this.data;
    }
    public static addRecord(record: IHandbookRow): void {
        record.id = this.data.length+1;
        record.fullname += `++ №${this.data.length+1}`
        this.data.push(record);
    }
    public static getRecord(id: number): IHandbookRow | undefined {
        return this.data.find(el => el.id === id);
    }
    public static changeRecord(id: number, record: IHandbookRow): void {
        Object.assign(this.getRecord(id), record);
    }
    public static deleteRecords(id: number[]): void {
        console.log(id);
        for (let idx = this.data.length-1; idx >= 0; idx--) {
            if (id.includes(this.data[idx].id)) {
                console.log(`found id: ${this.data[idx].id}, length: ${this.data.length}`);
                this.data.splice(idx, 1);
            }
        }
        // this.data.forEach((el, idx) => {
        //     if (id.includes(el.id)) {
        //         this.data.splice(idx, 1);
        //         console.log(`found id: ${el.id}, length: ${this.data.length}`);
        //     }
        // })
    }
}

// export const data: IHandbookRow[] = HandbookData.getData(45);