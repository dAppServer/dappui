import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import {SocketIoModule} from "ngx-socket-io";
import {WebSocketPubService} from "./web-socket-pub.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass, SocketIoModule],
  providers: [WebSocketPubService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lethean';

  serverStatus: boolean = false;
  constructor() {
    this.checkServer()
  }

  checkServer() {
    fetch('http://localhost:36911/system/check').then((res) => {
      this.serverStatus = res.ok
    }).catch((err) => {
      this.serverStatus = false
    })
  }
}
