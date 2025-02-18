import {AfterViewInit, Component, ErrorHandler, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DecimalPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {BlockchainService} from "./blockchain.service";
import {ChainGetInfo} from "./interfaces/props/get_info";
import {BlockHeader} from "./interfaces/types/blockHeader";
import {interval} from "rxjs";
import {WebsocketService} from "../../services/websocket.service";
import {TerminalComponent} from "../../services/terminal/terminal.component";
import {GlobalErrorHandler} from "../app.error";
@Component({
  selector: 'app-blockchain',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DecimalPipe,
    NgForOf,
    NgStyle,
    TerminalComponent
  ],
  providers: [ {
    // processes all errors
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },BlockchainService, Router],
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.scss'
})
export class BlockchainComponent implements OnInit, AfterViewInit, OnDestroy {

  installed: boolean = false;

  chainInfo!: ChainGetInfo;
  blocks!: BlockHeader[];

  blockSub: any = undefined
  downloadStats: {
    file: string,
    dir: string,
    fullPath: string,
    size: number,
    total: number,
    percent: number
  } = {
    file: '',
    dir: '',
    fullPath: '',
    size: 0,
    total: 0,
    percent: 0
  }
  constructor(private chain: BlockchainService, private ws: WebsocketService, private router: Router) {
  }

  ngOnDestroy(): void {
       this.blockSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    const blockInt = interval(10000);

    this.blockSub = blockInt.subscribe(async () => {
      await this.getChainInfo()
      await this.getBlocks()
    })
  }

  ngOnInit(): void {
    this.chain.daemonInstalled().then(async (res) => {
      this.installed = res;
      await this.chain.startDaemon();

      await this.getChainInfo();
      await this.getBlocks();
    })
  }

  async installDaemon() {
    if(this.downloadStats.total > 0){ return true }
    this.downloadProgress()
    await this.chain.installDaemon();
    return true;

  }

  downloadProgress(){
    let that = this;
    const subject = this.ws.connect().subscribe((data) => {
      try{
        that.downloadStats = JSON.parse(atob(data[1]));
        that.downloadStats.percent = Math.floor((that.downloadStats.total / that.downloadStats.size) * 100)
        if(this.downloadStats.total == this.downloadStats.size){
          subject.unsubscribe();
          setTimeout(() => {
            that.router.navigate(['/','blockchain'])
          }, 1000);

        }
      }catch (e){

      }


    })
    this.ws.sendMessage('daemon:download')

  }

  async getChainInfo() {
    this.chainInfo = await this.chain.getInfo();
  }

  async getBlocks() {
    if (this.chain.isRunning()) {
      const blocks = await this.chain.getBlocks(this.chainInfo.height - 25, this.chainInfo.height - 1)
      blocks['headers'] = blocks['headers'].reverse()
      // @ts-ignore
      if (this.blocks === undefined || (blocks['headers'] && this.blocks['headers'] && blocks['headers'][0]['hash'] !== this.blocks['headers'][0]['hash'])) {
        this.blocks = blocks['headers']
      }
    }
  }
}
