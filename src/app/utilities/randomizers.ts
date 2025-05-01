import { AttributeItem, CreateSettings, isNumericType, isRangeType } from "../models/models";
import { filterItems } from "./filterItems";

export function generateRandomObjects(attrArray: AttributeItem[], settings: CreateSettings){
      var filteredItems = filterItems(attrArray);
      console.log(filteredItems);
      
      seperateValues(filteredItems);

      const results: Record<string, any>[] = [];

      for (let i = 0; i < settings.outputCount; i++) {
        const obj: Record<string, any> = {};

        if (settings.enableID)
          obj["ID"] = (i + 1);

        filteredItems.forEach((attr: AttributeItem) => {
          if (attr.values && attr.values.length > 0)
            if (isRangeType(attr.type))
              obj[attr.attrName] = formatRange(attr);
            else
              switch (settings.probabilityFunc) {
                case 'Linear':
                  obj[attr.attrName] = getRandomValueWeightedDescending(attr.values);
                  break;
                default:
                  obj[attr.attrName] = getRandomValue(attr.values);
          }

          obj[attr.attrName] = formatNumeric(attr, obj[attr.attrName])
        });


        results.push(obj);
    }
    console.log(results);
    
  return results
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

function formatNumeric(attr: AttributeItem, value: any){
  if (isNumericType(attr.type))
      return +value;
  return value;
}

function formatRange(attr: AttributeItem){
  if (invalidRangeInput(attr))
    return 'ERROR: Insert exactly 2 numeric values (min, max)'

  const min = attr.values ? +attr.values[0] : 0;
  const max = attr.values ? +attr.values[1] : 0;

  switch(attr.type){
    case 'Integer Range':
      return Math.floor(Math.random() * (max - min + 1)) + min;
    default:
      return Math.random() * (max - min) + min;
  }
}

function invalidRangeInput(attr: AttributeItem): boolean {
  return (
    !Array.isArray(attr.values) ||
    attr.values.length !== 2 ||
    typeof +attr.values[0] !== "number" ||
    typeof +attr.values[1] !== "number"
  );
}

//#region Random Functions
function getRandomValue(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomValueWeightedDescending(arr: string[]): string {
  const n = arr.length;
  if (n === 0) return "";

  // Create weights: [n, n-1, ..., 1]
  const weights = arr.map((_, i) => n - i);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const rand = Math.random() * totalWeight;
  let cumulative = 0;

  for (let i = 0; i < n; i++) {
    cumulative += weights[i];
    if (rand < cumulative) {
      return arr[i];
    }
  }

  return arr[n - 1]; // fallback (should never hit)
}
//#endregion