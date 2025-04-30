//#region Types
export type FileExtension = 'json' | 'csv' | 'xlsx' 
export type InputType = 'Text' | 'Boolean' | 'Bit' | 'Numeric' | 'Integer Range' | 'Float Range';
export type NumericType = 'Bit' | 'Numeric' | 'Integer Range' | 'Float Range';
//#endregion

export function isNumericType(value: string): value is NumericType {
    return ['Bit', 'Numeric', 'Integer Range', 'Float Range'].includes(value);
}

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