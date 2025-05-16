import { Component } from '@angular/core';
import { FileInputComponent } from "../../shared/file-input/file-input.component";
import { ExcelData } from '../../models/models';

@Component({
  selector: 'app-xlsx-to-sql',
  imports: [FileInputComponent],
  templateUrl: './xlsx-to-sql.component.html',
  styleUrl: './xlsx-to-sql.component.scss'
})
export class XlsxToSqlComponent {

  excelData: ExcelData;

  onFileUpload(data: ExcelData){
    this.excelData = data;
  }

  //#region File error
  fileError: { message: string } | null = null;;

  onFileError(error: { message: string }){
    this.fileError = error;
  }
  //#endregion
}
