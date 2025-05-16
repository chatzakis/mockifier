import { Component } from '@angular/core';
import { FileInputComponent } from "../../shared/file-input/file-input.component";
import { ExcelData } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { exportSQLfromExcel } from '../../utilities/file-export';

@Component({
  selector: 'app-xlsx-to-sql',
  imports: [FormsModule, FileInputComponent],
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

  tableName: string;
  filename = 'excel-queries';
  isValid = (name: string) => /^(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$)[^<>:"/\\|?*\x00-\x1F]+[^<>:"/\\|?*\x00-\x1F .]$/.test(name);

  initSqlExport(){
    exportSQLfromExcel(this.excelData, this.tableName, this.filename);
  }

}
