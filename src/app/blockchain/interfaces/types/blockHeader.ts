export interface BlockHeader {
	block_size: number;
	depth: number;
	difficulty: number;
	hash: string;
	height: number;
	major_version: number;
	minor_version: number;
	nonce: number;
	num_txes: number;
	orphan_status: boolean;
	prev_hash: string;
	reward: number;
	timestamp: number;
}
