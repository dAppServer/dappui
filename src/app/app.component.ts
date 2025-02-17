import {Component, ErrorHandler} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import {SocketIoModule} from "ngx-socket-io";
import {GlobalErrorHandler} from "./app.error";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SocketIoModule],
  providers: [
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
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
    }).catch((_err) => {
      this.serverStatus = false
    })
  }
}
