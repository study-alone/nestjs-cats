import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common'
import { Response, Request } from 'express'

type NestCommonException = {
	error: string
	statusCode: number
	message: string | string[]
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()
		const error = exception.getResponse() as string | NestCommonException

		let result = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			error: null,
		}

		if (typeof error === 'string') {
			result.error = error
		} else {
			result = Object.assign(result, error)
		}

		response.status(status).json(result)
	}
}
