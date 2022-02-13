import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class PositiveIntPipe implements PipeTransform {
	transform(value: number, metadata: ArgumentMetadata) {
		console.log('PositiveIntPipe', value)
		return value
	}
}
