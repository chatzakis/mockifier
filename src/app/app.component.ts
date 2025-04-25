import { Component } from '@angular/core';
import { MainFormComponent } from "./views/main-form/main-form.component";

@Component({
  selector: 'app-root',
  imports: [MainFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mockifier';
}
