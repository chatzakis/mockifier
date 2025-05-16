//#region Types
export type InputType = 'Text' | 'Boolean' | 'Bit' | 'Numeric' | 'Integer Range' | 'Float Range' | 'Date Range';
export type NumericType = 'Bit' | 'Numeric' | 'Integer Range' | 'Float Range';
export type RangeType = 'Integer Range' | 'Float Range' | 'Date Range';


export function isValidInputType(value: string): value is InputType {
    return ['Text', 'Boolean', 'Bit', 'Numeric', 'Integer Range', 'Float Range', 'Date Range'].includes(value);
}

export function isNumericType(value: string): value is NumericType {
    return ['Bit', 'Numeric'].includes(value);
}

export function isRangeType(value: string): value is RangeType {
    return ['Integer Range', 'Float Range', 'Date Range'].includes(value);
}
//#endregion

//#region Files
export type FileExtension = 'json' | 'csv' | 'xlsx'; 
export const FileExtensions = ['json', 'csv', 'xlsx']

export interface ExcelData {
    colNames: string[], 
    valueRows: string[][]
}
//#endregion

export interface AttributeItem{
    attrName: string;
    valueStr: string;
    values?: string[];
    type: InputType,
    disabled?: boolean,
    required?: boolean
}

export interface CreateSettings{
    outputCount: number;
    enableID: boolean;
    probabilityFunc: 'Flat' | 'Linear'
}