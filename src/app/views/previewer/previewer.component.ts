import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-previewer',
  imports: [],
  templateUrl: './previewer.component.html',
  styleUrl: './previewer.component.scss'
})
export class PreviewerComponent {
  @Input({required: true}) mockData:any[];

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }
}
