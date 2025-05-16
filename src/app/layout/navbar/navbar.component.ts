import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { menuItems } from './menu-items';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuItems = menuItems;
}
