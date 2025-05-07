import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-previewer',
  imports: [],
  templateUrl: './previewer.component.html',
  styleUrl: './previewer.component.scss'
})
export class PreviewerComponent {
  @Input({required: true}) mockData:any[];

  mockDataShow: any[];

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }

  addQuote(value: any){
    if(typeof value !== "number")
      return '"';
    return;
  }

  isNum(value: any){
    if(typeof value == "number")
      return true;
    return false;
  }
}
