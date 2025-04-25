export interface AttributeItem{
    attrName: string;
    valueStr: string;
    values?: string[];
}

export interface CreateSettings{
    outputCount: number;
    enableID: boolean;
    descProbability: 'Flat' | 'Linear'
}