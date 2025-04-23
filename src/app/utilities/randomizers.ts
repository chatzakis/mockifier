import { AttributeItem } from "../models/models";

export function generateRandomObjects(attrArray: AttributeItem[], count: number, enableID: boolean): Record<string, string>[] {
    var filteredItems = attrArray.filter(item => !Object.values(item).every(value => value === ''));
    seperateValues(filteredItems);

    const results: Record<string, string>[] = [];
  
    for (let i = 0; i < count; i++) {
        const obj: Record<string, string> = {};
  
        attrArray.forEach((attr: AttributeItem) => {
            if (attr.values && attr.values.length > 0)
                obj[attr.attrName] = getRandomValue(attr.values);
        });
  
        if(enableID)
          obj["ID"] = (i + 1).toString();
  
        results.push(obj);
    }
  
    return results;
  }

  function seperateValues(items: AttributeItem[]) {
    items.forEach(item => {
      if (item.valueStr.includes(',')) {
        item.values = item.valueStr.split(',').map(value => value.trim());
      } else {
        item.values = [item.valueStr];
      }
    });
  }
  
  function getRandomValue(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }