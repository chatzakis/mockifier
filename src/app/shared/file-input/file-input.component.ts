import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttributeItem, ExcelData, FileExtension, InputType, isValidInputType } from '../../models/models';
import { getFileExtension, parseJson, parseCSV, parseXLSX, parseXLSXforTable } from '../../utilities/file-parsers';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent {
  @Input() mode: 'all' | 'excel' = 'all';

  @Output() fileData = new EventEmitter<AttributeItem[] | ExcelData>();
  @Output() excelData = new EventEmitter<ExcelData>();
  @Output() fileError = new EventEmitter<{ message: string }>();

  //#region File Listener
  onFileSelected(event: Event) {
    try {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
  
      if (!file) throw new Error('Error uploading file');
  
      const reader = new FileReader();
      var result: AttributeItem[];
      var excelResult: ExcelData
  
      reader.onload = () => {
        try {
          if (this.mode == 'excel'){
            excelResult = parseXLSXforTable(reader);
          }else{
            switch (getFileExtension(file)) {
              case 'json':
                result = parseJson(reader);
                break;
              case 'csv':
                result = parseCSV(reader);
                break;
              case 'xlsx':
                result = parseXLSX(reader);
                break;
              default:
                throw new TypeError('Unsupported file extension');
            }
          }
  
          if (this.mode == 'all' && (!result || result.length === 0)) {
            throw new Error('No valid data found in file');
          }

          if (this.mode == 'excel' && !excelResult) {
            throw new Error('No valid data found in file');
          }
          
          if (this.mode === 'all')
            this.fileData.emit(result);
          else
            this.excelData.emit(excelResult);
        } catch (error) {
          this.handleError(error);
        }
      };
  
      reader.onerror = () => {
        this.handleError(new Error('Failed to read file'));
      };
  
          // Use readAsArrayBuffer for XLSX files
      if (getFileExtension(file) === 'xlsx') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
      this.fileError.emit();
    } catch (error) {
      this.handleError(error);
    }
  }
  
  private handleError(error: unknown): void {
    const message = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while uploading the file';
      
    console.error('File processing error:', error);
    this.fileError.emit({ message });
  }
}

