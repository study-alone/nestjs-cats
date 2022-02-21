import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CatsModule } from 'src/cats/cats.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
	imports: [
		ConfigModule.forRoot(),
		// session 쿠키를 사용한다면 session 필드를 true로
		PassportModule.register({ defaultStrategy: 'jwt', session: true }),
		JwtModule.register({
			secret: 'secret',
			signOptions: { expiresIn: '1y' },
		}),
		forwardRef(() => CatsModule),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
