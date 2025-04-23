import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrevierComponent } from "../previer/previer.component";
import { FileInputComponent } from "../../shared/file-input/file-input.component";

import { generateRandomObjects } from '../../utilities/randomizers';
import { exportJson, exportSQL } from '../../utilities/file-export';
import { AttributeItem } from '../../models/models';

@Component({
  selector: 'app-main-form',
  imports: [FormsModule, FileInputComponent, PrevierComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  // Constants
  maxItems = 20
  itemNum = Array(this.maxItems);
  outputCount = 10;
  filename = 'mockified';
  tableName = 'myTable'
  enableID = true;

  output: any[] = [];

  items: AttributeItem[] =
    Array(this.maxItems).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
    }));

  isPreviousRowEmpty(index: number) {
    if (index === 0) return false;

    const prevRow = this.items[index - 1];
    return Object.values(prevRow).every(value => value === '' || value == null);
  }

  clear(){
    this.items = Array(this.maxItems).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
    }));
    
  }

  onFileUpload(data: AttributeItem[]){
    this.items = data.concat(this.items).slice(0,20);
  }

  onSubmit() {
    if (this.formEmpty()) return;

    this.output = generateRandomObjects(this.items.slice(0), this.outputCount, this.enableID);
    console.log(this.output);
  }

  formEmpty(): boolean{
    return this.items.filter(item => !Object.values(item).every(value => value === '')).length < 1;
  }

  onExportSQL(){
    exportSQL(this.output, this.filename, this.tableName);
    // const result = generateRandomObjects(this.items.slice(0), this.outputCount, this.enableID);
    // console.log(generateInsertQueries(result, this.tableName,));
  }

  onExportJSON(){
    exportJson(this.output, this.filename);  
  }
}