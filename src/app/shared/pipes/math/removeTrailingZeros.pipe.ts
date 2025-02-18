import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'removeTrailingZero', pure: true })
export class RemoveTrailingZerosPipe implements PipeTransform {
	constructor() {}

	transform(value) {
		value = value.toString();
		if (value.indexOf('.') === -1) {
			return parseInt(value);
		}
		while (
			(value.slice(-1) === '0' || value.slice(-1) === '.') &&
			value.indexOf('.') !== -1
		) {
			value = value.substr(0, value.length - 1);
		}
		return value;
	}
}
