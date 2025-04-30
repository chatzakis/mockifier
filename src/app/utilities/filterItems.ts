import { AttributeItem } from "../models/models";

export function filterItems(array: AttributeItem[]){
    return array.filter(item => !Object.values(item).slice(0,2).every(value => value === ''));
}