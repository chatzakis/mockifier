import { Component, EventEmitter, Output } from '@angular/core';
import { AttributeItem } from '../../models/models';
import { FileExtension } from '../../models/enums';

@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss'
})
export class FileInputComponent {
  @Output() fileData = new EventEmitter<AttributeItem[]>();

    //#region File Listener
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
    
      if (!file) return;
    
      const reader = new FileReader();
      var result: AttributeItem[];

      reader.onload = () => {
        switch(getFileExtension(file)){
          case 'json':
            result = parseJson(reader);
            break;
        }
        
        this.fileData.emit(result)
      };

      reader.readAsText(file);
    }
}

function getFileExtension(file: File): FileExtension{
  return 'json';
}

function parseJson(reader: FileReader): AttributeItem[] {
  try {
    const parsed = JSON.parse(reader.result as string);
    
    if (!Array.isArray(parsed)) throw new Error("Invalid format");

    return parsed.map((entry: any) => ({
      attrName: entry.attrName || '',
      valueStr: Array.isArray(entry.values) ? entry.values.join(', ') : '',
      type: entry?.type || 'Text' 
    }));

  } catch (err) {
    console.error('Invalid JSON format:', err);
    return [];
  }
}