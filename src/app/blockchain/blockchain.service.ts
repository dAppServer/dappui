import {Injectable} from '@angular/core';
import {ChainGetInfo} from "./interfaces/props/get_info";

export const rpcBody = (method: any) => (params: any) => ({
  jsonrpc: '2.0',
  id: '0',
  method: method,
  params: params
});

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public chainInfo: ChainGetInfo | undefined;

  constructor() {
  }

  async startDaemon() {
    const req = await fetch('http://localhost:36911/api/blockchain/lthn/v1/daemon/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"configFile": "letheand.conf", 'logDir': 'data/log/lthn/letheand.log', "dataDir": "data/lthn"})
    })

  }

  isRunning(){
    return this.chainInfo !== undefined && this.chainInfo.status === 'OK'
  }

  async daemonInstalled() {
    const req = await fetch('http://localhost:36911/mod/io/fs/local/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: 'apps/blockchain/lthn',
        }),
      })

    const json = await req.json();
    return !!json.includes('letheand');

  }

  async installDaemon() {
    const req = await fetch('http://localhost:36911/api/blockchain/lthn/v1/daemon/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    return req.json();
  }

  async chainRpc(params: any) {
    try {
      let request = {
        "url": params['url'],
        "req": rpcBody(params['method'])(params['params'])
      }
      const req = await fetch(`http://localhost:36911/api/blockchain/lthn/v1/daemon/json_rpc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      const res = await req.json()

      if (res['result']) {
        return res['result']
      }
      return false
    } catch (e) {
      return false
    }
  }

  /**
   * {
   *     "alt_blocks_count": 0,
   *     "block_size_limit": 667952,
   *     "cumulative_difficulty": 291730085950055,
   *     "difficulty": 92911029,
   *     "grey_peerlist_size": 357,
   *     "height": 1661677,
   *     "incoming_connections_count": 6,
   *     "outgoing_connections_count": 5,
   *     "start_time": 1711562006,
   *     "status": "OK",
   *     "target": 120,
   *     "target_height": 0,
   *     "testnet": false,
   *     "top_block_hash": "bea7604e51f6277e06ea9d8258cb9bd46c1154fbb7d4f482719cb4521a0a8028",
   *     "tx_count": 1371078,
   *     "tx_pool_size": 0,
   *     "white_peerlist_size": 21
   *
   * }
   */
  async getInfo(): Promise<ChainGetInfo>{
    return this.chainInfo = await this.chainRpc({"method": 'get_info'})
  }

  async getTransactions(txsHashes: string[]) {

    return await this.chainRpc({"method": 'gettransactions', "params": {txs_hashes: txsHashes}});
  }


  async getBlock(block_id: string) {

    return await this.chainRpc({"method": "getblock", "params": {hash: block_id}})
  }

  async getBlocks(start_height: number, end_height: number) {

    return await this.chainRpc({
      "method": 'getblockheadersrange', "params": {
        start_height: start_height,
        end_height: end_height
      }
    })
  }
}
