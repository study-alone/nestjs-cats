import { ApiProperty, PickType } from '@nestjs/swagger'
import { Cat } from '../cats.schema'

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
	@ApiProperty({
		example: '2133453444656',
		description: '부여된 아이디',
	})
	id: string
}
