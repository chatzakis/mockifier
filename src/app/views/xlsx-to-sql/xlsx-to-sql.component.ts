import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { FileInputComponent } from "../../shared/file-input/file-input.component";
import { ExcelData } from '../../models/models';
import { FormsModule, NgForm } from '@angular/forms';
import { exportSQLfromExcel } from '../../utilities/file-export';

@Component({
  selector: 'app-xlsx-to-sql',
  imports: [FormsModule, FileInputComponent],
  templateUrl: './xlsx-to-sql.component.html',
  styleUrl: './xlsx-to-sql.component.scss'
})
export class XlsxToSqlComponent implements AfterViewInit {

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

  @ViewChild('sqlExportForm') sqlExportForm: NgForm;

  ngAfterViewInit(){
     setTimeout(() => {
      if (this.sqlExportForm.controls['filename']) {
        this.sqlExportForm.controls['filename'].setValue('excel-queries');
      }
    });
  }
  
  isValid = (name: string) => /^(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$)[^<>:"/\\|?*\x00-\x1F]+[^<>:"/\\|?*\x00-\x1F .]$/.test(name);

  initSqlExport(formData: NgForm){
    if(formData.form.valid){
      exportSQLfromExcel(this.excelData, formData.value.tableName, formData.value.filename);
    }
  }

}
