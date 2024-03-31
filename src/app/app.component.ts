import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lethean';

  serverStatus: boolean = false;
  constructor() {
    console.log('AppComponent.constructor');
    this.checkServer()
  }

  checkServer() {
    fetch('http://localhost:36911/api/v1/system/check').then((res) => {
      console.log('res',res);
      this.serverStatus = true
    }).catch((err) => {
      console.log('e',err);
    })
  }
}
