export interface ChainGetInfo {
	alt_blocks_count: number;
	difficulty: number;
	grey_peerlist_size: number;
	height: number;
	incoming_connections_count: number;
	outgoing_connections_count: number;
	status: string;
	target: number;
	target_height: number;
	testnet: boolean;
	top_block_hash: string;
	tx_count: number;
	tx_pool_size: number;
	white_peerlist_size: number;
	start_time: number;
	cumulative_difficulty: number;
	block_size_limit: number;
}
