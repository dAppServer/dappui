import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {BlockchainService} from "./blockchain.service";
import {ChainGetInfo} from "./interfaces/props/get_info";
import {BlockHeader} from "./interfaces/types/blockHeader";
import {interval,isObservable} from "rxjs";


@Component({
  selector: 'app-blockchain',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DecimalPipe,
    NgForOf,
  ],
  providers: [BlockchainService],
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.scss'
})
export class BlockchainComponent implements OnInit, AfterViewInit, OnDestroy {

  installed: boolean = false;

  chainInfo!: ChainGetInfo;
  blocks!: BlockHeader[];

  blockSub: any = undefined

  constructor(private chain: BlockchainService) {
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
      console.log(this.chainInfo)
      console.log('Daemon installed');

    })
  }

  async installDaemon() {
    await this.chain.installDaemon();
  }

  async getChainInfo() {
    this.chainInfo = await this.chain.getInfo();
  }

  async getBlocks() {
    if (this.chain.isRunning()) {
      const blocks = await this.chain.getBlocks(this.chainInfo.height - 25, this.chainInfo.height - 1)
      blocks['headers'] = blocks['headers'].reverse()
      // @ts-ignore
      if (this.blocks === undefined || blocks['headers'][0]['hash'] !== this.blocks['headers'][0]['hash']) {
        this.blocks = blocks['headers']
        console.log(this.blocks)
      }
    }
  }
}
