import { AttributeItem, CreateSettings } from "../models/models";

export function generateRandomObjects(attrArray: AttributeItem[], settings: CreateSettings){
      var filteredItems = attrArray.filter(item => !Object.values(item).every(value => value === ''));
      seperateValues(filteredItems);

      const results: Record<string, string>[] = [];

      for (let i = 0; i < settings.outputCount; i++) {
        const obj: Record<string, string> = {};

        attrArray.forEach((attr: AttributeItem) => {
          if (attr.values && attr.values.length > 0)
            switch (settings.descProbability) {
              case 'Linear':
                obj[attr.attrName] = getRandomValueWeightedDescending(attr.values);
                break;
              default:
                obj[attr.attrName] = getRandomValue(attr.values);
            }
        });

        if (settings.enableID)
          obj["ID"] = (i + 1).toString();

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