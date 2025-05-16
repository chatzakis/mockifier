import { AttributeItem, ExcelData } from "../models/models";
import { filterItems } from "./filterItems";

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

    const content = sqlStatements.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    downloadFile(blob, fileName + '.txt')
    
}

function createSQLQueries(data:any, tableName:string, fields = null){
    if (!data.length) return [];

    const keys = fields || Object.keys(data[0]);

    return data.map((row:any) => {
        const values = keys.map(key => {
            const val = row[key];
            if (typeof val === 'number') {
              return String(val);
            } else {
              return `'${String(val).replace(/'/g, "''")}'`;
            }
          }).join(", ");
        return `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${values});`;
    });
}
//#endregion

//#region File Export
export function exportParameters(parameters:AttributeItem[], fileName:string){
    var filteredParams = filterItems(parameters);

    const jsonStr = JSON.stringify(parametersToJSON(filteredParams), null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });

    downloadFile(blob, fileName + '.params.json')
}

function parametersToJSON(parameters: AttributeItem[]){
    return parameters.map(({ attrName, valueStr, type }) => ({
        attrName,
        values: valueStr
          .split(",")
          .map(s => s.trim())
          .filter(Boolean), // remove empty strings
        type
      }));
}
//#endregion

//#region Excel to SQL
export function exportSQLfromExcel(
  data: ExcelData,
  tableName: string,
  fileName: string = 'insert_queries.sql'
) {
  if (!data.colNames.length || !data.valueRows.length) {
    throw new Error('Excel data must contain at least one column and one row.');
  }

  const escapeSql = (value: any): string => {
    // Handle nulls and escape single quotes
    const valueStr = value.toString();
    if (valueStr.toString().toLowerCase() === 'null') return 'NULL';
    if (typeof value == 'number') return valueStr;
    return `'${valueStr.replace(/'/g, "''")}'`;
  };

  const columnList = data.colNames.join(', ');

  const sqlStatements = data.valueRows.map(row => {
    const escapedValues = row.map(escapeSql).join(', ');
    return `INSERT INTO ${tableName} (${columnList}) VALUES (${escapedValues});`;
  });

  const content = sqlStatements.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

  downloadFile(blob, fileName + '.txt')
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