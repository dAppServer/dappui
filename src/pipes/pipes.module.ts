import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffortPipe, EscapeHtmlPipe, HashLinkPipe, HashRatePipe, RemoveTrailingZerosPipe, ShruggiePipe, TimeAgoPipe, ToCoinPipe} from '@pipe/index';
import {FromCoinPipe} from '@pipe/crypto/fromCoin.pipe';
import {FileSizePipe} from '@pipe/content/filesize.pipe';

@NgModule({
	declarations: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		ToCoinPipe,
		FromCoinPipe,
		HashLinkPipe,
		FileSizePipe
	],
	exports: [
		HashRatePipe,
		EffortPipe,
		TimeAgoPipe,
		EscapeHtmlPipe,
		ShruggiePipe,
		RemoveTrailingZerosPipe,
		ToCoinPipe,
		HashLinkPipe,
		FromCoinPipe,
		FileSizePipe
	],
	imports: [CommonModule]
})
export class PipesModule {
}
