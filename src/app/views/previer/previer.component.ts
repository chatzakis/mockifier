import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-previer',
  imports: [],
  templateUrl: './previer.component.html',
  styleUrl: './previer.component.scss'
})
export class PrevierComponent {
  @Input({required: true}) mockData:any[];

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }
}
