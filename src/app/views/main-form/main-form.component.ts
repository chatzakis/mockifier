import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PreviewerComponent } from "../previewer/previewer.component";
import { FileInputComponent } from "../../shared/file-input/file-input.component";

import { generateRandomObjects } from '../../utilities/randomizers';
import { exportJson, exportParameters, exportSQL } from '../../utilities/file-export';
import { AttributeItem, CreateSettings, FileExtensions } from '../../models/models';
import { filterItems } from '../../utilities/filterItems';

@Component({
  selector: 'app-main-form',
  imports: [FormsModule, FileInputComponent, PreviewerComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  // Constants
  maxItems = 20
  itemNum = Array(this.maxItems);
  filename = 'mockified';
  tableName = 'myTable'

  fileExtensions = FileExtensions;

  loading = false;

  createSettings: CreateSettings  = 
  { outputCount: 10, enableID: true, probabilityFunc: 'Flat'}

  output: any[] = [];

  items: AttributeItem[] =
    Array(this.maxItems).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
      type: 'Text'
    }));

  isPreviousRowEmpty(index: number) {
    if (index === 0) return false;

    const prevRow = this.items[index - 1];
    return Object.values(prevRow).slice(0, 2).every(value => value === '' || value == null);
  }

  clear(){
    this.items = Array(this.maxItems).fill(null).map(() => ({
      attrName: '',
      valueStr: '',
      type: 'Text'
    }));
  }

  onFileUpload(data: AttributeItem[]){
    this.items = data.concat(this.items).slice(0,20);
  }

  onSelectChange(i:number){
    switch(this.items[i].type){
      case 'Boolean':
        this.items[i].valueStr = 'true, false';
        this.items[i].disabled = true;
        break;
        case 'Bit':
          this.items[i].valueStr = '1, 0';
          this.items[i].disabled = true;
          break;
        default:
          this.items[i].disabled = false;
    }
  }

  onValueChange(i:number){
    if(this.items[i].valueStr && this.items[i].valueStr !== '')
      this.items[i].required = true
    else
      this.items[i].required = false
  }


  //#region Submit
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
    return filterItems(this.items).length < 1;
  }

  formInvalid(): boolean{
    return this.formEmpty() || this.items.some(item => Object.values(item)[0] === '' && Object.values(item)[1] !== '');
  }
  //#region 

  //#region Exports
  onExportParameters(){
    exportParameters(this.items, this.filename);
  }

  onExportSQL(){
    exportSQL(this.output, this.filename, this.tableName);
  }

  onExportJSON(){
    exportJson(this.output, this.filename);  
  }
  //#endregion

  //#region File error
  fileError: { message: string } | null = null;;

  onFileError(error: { message: string }){
    this.fileError = error;
  }
  //#endregion
}