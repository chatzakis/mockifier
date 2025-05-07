import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainFormComponent } from "./views/main-form/main-form.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mockifier';
}
