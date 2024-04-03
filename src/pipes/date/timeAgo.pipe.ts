import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
	name: 'timeAgo',
	pure: false
})
export class TimeAgoPipe implements PipeTransform {
	private static translations: any;

	constructor(private translate: TranslateService) {
		this.translate.getStreamOnTranslationChange([
			'words.time.past.seconds',
			'words.time.past.minute',
			'words.time.past.minutes',
			'words.time.past.hour',
			'words.time.past.hours',
			'words.time.past.day',
			'words.time.past.days',
			'words.time.past.month',
			'words.time.past.months',
			'words.time.past.year',
			'words.time.past.years',
		]).subscribe((data) => TimeAgoPipe.translations = data)

	}

	transform(value: number) {
		const d = new Date(value * 1000);
		const now = new Date();
		const seconds = Math.round(
			Math.abs((now.getTime() - d.getTime()) / 1000)
		);
		const minutes = Math.round(Math.abs(seconds / 60));
		const hours = Math.round(Math.abs(minutes / 60));
		const days = Math.round(Math.abs(hours / 24));
		const months = Math.round(Math.abs(days / 30.416));
		const years = Math.round(Math.abs(days / 365));

			if (Number.isNaN(seconds)) {
				return '';
			} else if (seconds <= 45) {
				return TimeAgoPipe.translations['words.time.past.seconds'];
			} else if (seconds <= 90) {
				return TimeAgoPipe.translations['words.time.past.minute'];
			} else if (minutes <= 45) {
				return `${minutes} ${TimeAgoPipe.translations['words.time.past.minutes']}`;
			} else if (minutes <= 90) {
				return TimeAgoPipe.translations['words.time.past.hour'];
			} else if (hours <= 22) {
				return `${hours} ${TimeAgoPipe.translations['words.time.past.hours']}`;
			} else if (hours <= 36) {
				return TimeAgoPipe.translations['words.time.past.day'];
			} else if (days <= 25) {
				return `${days} ${TimeAgoPipe.translations['words.time.past.days']}`;
			} else if (days <= 45) {
				return TimeAgoPipe.translations['words.time.past.month'];
			} else if (days <= 345) {
				return `${months} ${TimeAgoPipe.translations['words.time.past.months']}`;
			} else if (days <= 545) {
				return TimeAgoPipe.translations['words.time.past.year'];
			} else {
				// (days > 545)
				return `${years} ${TimeAgoPipe.translations['words.time.past.years']}`;
			}
		}


}
