import { AttributeItem, CreateSettings, isNumericType, isRangeType } from "../models/models";
import { filterItems } from "./filterItems";

export function generateRandomObjects(attrArray: AttributeItem[], settings: CreateSettings){
      var filteredItems = filterItems(attrArray);
      
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
  if(attr.type == 'Date Range')
    return dateRange(attr)

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

function dateRange(attr: AttributeItem){
  if (!(attr.values && attr.values.length == 2 && attr.values[0] !== null && attr.values[1] !== null)) {
    return "Add a start and finish date. Use 'yyyy-MM-dd' format.";
  }

  const start = new Date(attr.values[0]);
  const end = new Date(attr.values[1]);

  // Ensure valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date format. Use 'yyyy-MM-dd'.";
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  if (endTime < startTime) {
    return "End date must be after start date.";
  }

  const randomTime = startTime + Math.random() * (endTime - startTime);
  const randomDate = new Date(randomTime);

  // Format the result as 'yyyy-MM-dd'
  const yyyy = randomDate.getFullYear();
  const mm = String(randomDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const dd = String(randomDate.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
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