export interface AttributeItem{
    attrName: string;
    valueStr: string;
    values?: string[];
    type: 'Text' | 'Boolean' | 'Numeric' | 'Integer Range' | 'Float Range',
    disabled?: boolean,
    required?: boolean
}

export interface CreateSettings{
    outputCount: number;
    enableID: boolean;
    descProbability: 'Flat' | 'Linear'
}