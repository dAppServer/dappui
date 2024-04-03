import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgTerminal, NgTerminalModule} from "ng-terminal";
import {WebsocketService} from "../websocket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [
    NgTerminalModule
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements AfterViewInit, OnInit {
  @ViewChild('term', {static: false}) child!: NgTerminal;
  @Input() attach: string  = 'letheand';
  private command: string[] = []
  subs: Subscription[] = []
  constructor(private ws: WebsocketService, private ref: ChangeDetectorRef) {
    this.ref.detach()
    setInterval(() => {
      this.ref.detectChanges();
    }, 1000);

  }

  ngOnInit(): void {
    let that = this;

    if(this.subs['0'] === undefined) {

      this.ref.detectChanges();
      this.subs[0] = this.ws.connect().subscribe((data) => {
        console.log(data)
      	if (this.attach === data[0]) {
          if(this.child.underlying) {
            if (data[0] === 'update-cli') {
              this.child.underlying.writeln(data[1]);
            } else {
              this.child.underlying.writeln(atob(data[1]).trim().replace('src/cryptonote_protocol/cryptonote_protocol_handler.inl', ''));
            }
          }

      		that.ref.markForCheck()
      	}

      })

      this.changeStream(`daemon:${this.attach}`)
    }
    console.log('hi')
    this.ws.sendMessage(`daemon:${this.attach}`)
  }

  @Input()
  set cmd(name: string) {
    if (name.length > 1) {
      this.ws.sendMessage(`cmd:${this.attach}:${name}`)
      //this.terminal.underlying.writeln("\r\n");
      //this._cmd = (name && name.trim()) || '';
    }
  }

  getSub(){
    return this.ws.connect();
  }

  changeStream(channel:string){
    this.ws.sendMessage(channel)
    this.ref.markForCheck()
  }
  ngAfterViewInit() {
    const that = this;
    // this.terminal.setRows(25)
    // if(this.terminal.keyEventInput) {
    //
    // 	this.subs['term'] = this.terminal.keyEventInput.subscribe((e) => {
    // 		//console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);
    //
    // 		const ev = e.domEvent;
    // 		const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    //
    // 		if (ev.keyCode === 13) {
    //
    // 			//console.log(`cmd:letheand:${this.command.join('')}`)
    // 			that.ws.sendMessage(`cmd:${this.attach}:${this.command.join('')}`)
    // 			this.command = []
    // 			this.terminal.underlying.writeln("\r\n");
    // 			this.ref.detectChanges();
    // 		} else if (ev.keyCode === 8) {
    // 			 this.command.pop()
    // 			if (this.terminal.underlying.buffer.active.cursorX > 0) {
    // 				this.terminal.underlying.write('\b \b');
    // 				this.ref.detectChanges();
    // 			}
    // 		} else if (printable) {
    // 			this.command.push(e.key);
    // 			this.terminal.write(e.key);
    // 			this.ref.detectChanges();
    // 		}
    // 		//console.log(this.command.join(""))
    // 	});
    // }
  }

}
