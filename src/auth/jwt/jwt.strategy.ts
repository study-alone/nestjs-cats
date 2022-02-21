import { CatsRepository } from './../../cats/cats.repository'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Payload } from './jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly catsRepository: CatsRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// 유출 되면 안되니까 환경변수로
			// JwtModule.register의 secret 필드와 동일한 key를 사용
			secretOrKey: 'secret',
			ignoreExpiration: false,
		})
	}

	async validate(payload: Payload) {
		const cat = await this.catsRepository.findCatByIdWithoutPassword(
			payload.sub,
		)

		if (cat) {
			return cat // request.use에 cat이 들어갑니다.
		} else {
			throw new UnauthorizedException('접근 오류')
		}
	}
}
