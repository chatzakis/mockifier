import { AttributeItem } from "../models/models";

//#region JSON
export function exportJson(mockData: AttributeItem[], fileName: string) {
    const jsonStr = JSON.stringify(mockData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });

    downloadFile(blob, fileName + '.json')
}
//#endregion

//#region SQL
export function exportSQL(data:any, fileName: string, tableName:string) {
    const sqlStatements = createSQLQueries(data, tableName);
    console.log(sqlStatements);

    const content = sqlStatements.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    downloadFile(blob, fileName + '.txt')
    
}

function createSQLQueries(data:any, tableName:string, fields = null){
    if (!data.length) return [];

    const keys = fields || Object.keys(data[0]);

    return data.map((row:any) => {
        const values = keys.map(key => `'${String(row[key]).replace(/'/g, "''")}'`).join(", ");
        return `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${values});`;
    });
}
//#endregion

function downloadFile(blob: Blob, fileName: string){
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
}