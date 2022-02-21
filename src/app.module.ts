import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose'

@Module({
	imports: [
		// expandVariables: env 파일의 변수들 간의 interpolation 사용여부
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		// async로 변경하고
		MongooseModule.forRootAsync({
			// ConfigService 주입
			inject: [ConfigService],
			// 주입 받은 ConfigService의 get 으로 불러온 환경변수 가져오기
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get('MONGODB_URI'),
			}),
		}),
		CatsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false

	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('cats')
		mongoose.set('debug', this.isDev)
	}
}
