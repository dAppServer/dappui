import {ChainGetInfo} from '@module/chain/interfaces/props/get_info';
import {Transactions} from '@module/chain/interfaces/props/transactions';
import {BlockHeader} from '@module/chain/interfaces/types/blockHeader';

export interface ChainState {
	info: ChainGetInfo
	transactions: Transactions
	blocks: {
		headers: BlockHeader[]
	}
}

export class ChainState implements ChainState {}
