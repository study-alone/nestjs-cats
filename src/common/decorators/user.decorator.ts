import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ReadOnlyCatDto } from 'src/cats/dto/cat.dto'

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		return request.user as ReadOnlyCatDto
	},
)
