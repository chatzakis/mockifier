import { AttributeItem, isValidInputType, InputType, ExcelData } from '../models/models';
import * as XLSX from 'xlsx';

export function getFileExtension(file: File): string {
  const parts = file.name.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

export function parseJson(reader: FileReader): AttributeItem[] {
  const parsed = JSON.parse(reader.result as string);

  if (!Array.isArray(parsed)) throw new Error('Invalid format');

  return parsed.map((entry: any) => ({
    attrName: entry.attrName || '',
    valueStr: Array.isArray(entry.values) ? entry.values.join(', ') : '',
    type: entry?.type || 'Text',
  }));
}

export function parseCSV(reader: FileReader): AttributeItem[] {
  const csvContent = reader.result as string;
  const lines = csvContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [attrName, type, ...values] = line
      .split(',')
      .map((value) => value.trim());

    if (!attrName || !type) {
      throw new Error('CSV line must contain at least attribute name and type');
    }

    if (!isValidInputType(type)) {
      throw new Error(`Invalid type "${type}" for attribute "${attrName}"`);
    }

    return {
      attrName,
      type: type as InputType,
      values: values,
      valueStr: values.join(', '),
    };
  });
}

export function parseXLSX(reader: FileReader): AttributeItem[] {
  const data = new Uint8Array(reader.result as ArrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  }) as string[][];

  if (jsonData.length < 1) {
    throw new Error('XLSX file must contain at least 1 row (attributes)');
  }

  const attrNames = jsonData[0];
  const hasTypeRow = checkTypeRow(jsonData[1]);
  const types = hasTypeRow ? jsonData[1] : [];
  const valueRows = hasTypeRow ? jsonData.slice(2) : jsonData.slice(1);

  return attrNames.map((attrName, index) => {
    const type = types[index]?.trim();

    // If type is missing or invalid, default to 'Text'
    const validType = type && isValidInputType(type) ? type : 'Text';

    const values = valueRows
      .map((row) => row[index])
      .filter((value) => value !== undefined && value !== null && value !== '');

    return {
      attrName: attrName.trim(),
      type: validType as InputType,
      values: values,
      valueStr: values.join(', '),
    };
  });
}

function checkTypeRow(row: any[]):boolean{
    if (!row || row.length === 0) return false;
    
    const validTypes = row.filter(value => isValidInputType(value)).length;
    return validTypes >= Math.ceil(row.length / 2);
}

//#region XLSX to SQL
export function parseXLSXforTable(reader: FileReader): ExcelData {
  const data = new Uint8Array(reader.result as ArrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  }) as string[][];

  if (jsonData.length < 1) {
    throw new Error('XLSX file must contain at least 1 row (attributes)');
  }

  return {
      colNames: jsonData[0],
      valueRows: jsonData.slice(1)
  };
}
