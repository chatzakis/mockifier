import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Item{
  attrName: string;
  valueStr: string;
  values?: string[];
} 

@Component({
  selector: 'app-main-form',
  imports: [FormsModule],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  // Subdivisions
  itemNum = Array(20);
  outputCount = 10;
  filename = 'mockified';
  tableName = 'Pinakas'
  enableID = true;

  items: Item[] =
    Array(20).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
    }));

  isPreviousRowEmpty(index: number) {
    if (index === 0) return false;

    const prevRow = this.items[index - 1];
    return Object.values(prevRow).every(value => value === '' || value == null);
  }

  clear(){
    this.items = Array(20).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
    }));
  }

  onSubmit() {
    var filteredItems = this.items.filter(item => !Object.values(item).every(value => value === ''));
    this.seperateValues(filteredItems);
    const result = generateRandomObjects(filteredItems, this.outputCount, this.enableID);
    console.log('Submitted Subdivisions:', result);

    const jsonStr = JSON.stringify(result, null, 2); // Pretty-print with 2-space indentation
    this.downloadJson(jsonStr);  }

  seperateValues(items: Item[]) {
    items.forEach(item => {
      if (item.valueStr.includes(',')) {
        item.values = item.valueStr.split(',').map(value => value.trim());
      } else {
        item.values = [item.valueStr];
      }
    });
  }

  downloadJson(jsonStr: string) {
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = this.filename + ".json";
    a.click();
    
    URL.revokeObjectURL(url);
  }

  onExportSQL(){
    var filteredItems = this.items.filter(item => !Object.values(item).every(value => value === ''));
    this.seperateValues(filteredItems);
    const result = generateRandomObjects(filteredItems, this.outputCount, this.enableID);

    console.log(generateInsertQueries(result, this.tableName,));
    
  }

  //#region File Listener
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        
        if (!Array.isArray(parsed)) throw new Error("Invalid format");
  
        this.items = parsed.map((entry: any) => ({
          attrName: entry.attrName || '',
          valueStr: Array.isArray(entry.values) ? entry.values.join(', ') : ''
        }));
      } catch (err) {
        console.error('Invalid JSON format:', err);
      }
    };
  
    reader.readAsText(file);
  }

}

function generateRandomObjects(attrArray: Item[], count: number, enableID: boolean): Record<string, string>[] {
  const results: Record<string, string>[] = [];

  for (let i = 0; i < count; i++) {
      const obj: Record<string, string> = {};

      attrArray.forEach((attr: Item) => {
          if (attr.values && attr.values.length > 0)
              obj[attr.attrName] = getRandomValue(attr.values);
      });

      if(enableID)
        obj["ID"] = (i + 1).toString();

      results.push(obj);
  }

  return results;
}

function getRandomValue(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//#region SQL
function generateInsertQueries(data:any, tableName:string, fields = null) {
  if (!data.length) return [];

  const keys = fields || Object.keys(data[0]);

  return data.map((row:any) => {
    const values = keys.map(key => `'${String(row[key]).replace(/'/g, "''")}'`).join(", ");
    return `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${values});`;
  });
}