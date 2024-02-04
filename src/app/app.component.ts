import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_MENU_ITEMS } from './app.menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dappui';
  nav = APP_MENU_ITEMS
}
