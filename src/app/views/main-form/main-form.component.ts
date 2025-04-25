import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrevierComponent } from "../previer/previer.component";
import { FileInputComponent } from "../../shared/file-input/file-input.component";

import { generateRandomObjects } from '../../utilities/randomizers';
import { exportJson, exportParameters, exportSQL } from '../../utilities/file-export';
import { AttributeItem, CreateSettings } from '../../models/models';

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
  filename = 'mockified';
  tableName = 'myTable'

  loading = false;

  createSettings: CreateSettings  = 
  { outputCount: 10, enableID: true, descProbability: 'Flat'}

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

  async onSubmit() {
    if (this.formEmpty()) return;

    this.loading = true;
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this.output = generateRandomObjects(this.items.slice(0), this.createSettings);
        resolve();
      });
    });
    this.loading = false;
  }

  formEmpty(): boolean{
    return this.items.filter(item => !Object.values(item).every(value => value === '')).length < 1;
  }

  onExportParameters(){
    exportParameters(this.items, this.filename);
  }

  onExportSQL(){
    exportSQL(this.output, this.filename, this.tableName);
  }

  onExportJSON(){
    exportJson(this.output, this.filename);  
  }
}