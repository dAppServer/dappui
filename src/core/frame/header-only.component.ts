import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APP_MENU_ITEMS } from './app.menu';
import { serverSDKApiModule, SystemService } from '@lethean/api-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-frame-header-only',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, serverSDKApiModule, HttpClientModule],
  templateUrl: './header-only.component.html',
  styleUrl: './header-only.component.css'
})
export class CoreFrameHeaderOnlyComponent {
  title = 'dappui';
  nav = APP_MENU_ITEMS

  constructor(private systemService: SystemService) {
    this.systemService.checkServer().subscribe(data => {
      console.log(data);
    });
  }
}
