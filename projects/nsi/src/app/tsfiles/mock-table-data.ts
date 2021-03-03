export interface IHandbookRow {
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

    public static getData(rows: number): IHandbookRow[] {
        this.data = [];
        for (let i = 0; i < rows; i++) {
            let date: number = (Date.now()-Math.random()*20*365*24*60*60*1000+10*365*24*60*60*1000); 
            this.data.push({
                fullname: `Запись справочника №${i+1}`,
                recordStatus: this.status[Math.floor(Math.random()*2)],
                code: this.code[Math.floor(Math.random()*2)],
                recordStartDate: new Date(date).toLocaleDateString(),
                recordEndDate: new Date(date+Math.random()*5*365*24*60*60*1000).toLocaleDateString(),
                codeEndDate: this.getMockDate(),
            });

        }
        // this.data = _data;   
        return this.data;
    }
}

// export const data: IHandbookRow[] = HandbookData.getData(45);