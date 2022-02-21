import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter'
import { SuccessInterceptor } from './common/interceptors/success.interceptor'

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule)
	// ValidationPipefmf global로 등록하지 않으면 class-vaildator의 Decorator들을 사용할수가 없다.
	app.useGlobalPipes(new ValidationPipe())
	// 전역 filter 등록
	app.useGlobalFilters(new HttpExceptionFilter())
	// 전역 interceptor 등록
	app.useGlobalInterceptors(new SuccessInterceptor())
	// CORS 허용
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	})

	const config = new DocumentBuilder()
		.setTitle('C.I.C')
		.setDescription('cat')
		.setVersion('1.0.0')
		.build()
	const document: OpenAPIObject = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(process.env.PORT)
}

bootstrap()
