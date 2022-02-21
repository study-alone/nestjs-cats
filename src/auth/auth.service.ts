import { CatsRepository } from './../cats/cats.repository'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginRequestDto } from './dto/login.request.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly catsRepository: CatsRepository,
		private jwtSetvice: JwtService,
	) {}

	async jwtLogin(data: LoginRequestDto) {
		const { email, password } = data

		// 해당하는 이메일이 있는지
		const cat = await this.catsRepository.findCatByEmail(email)

		if (!cat) {
			throw new UnauthorizedException('이메일을 확인해 주세요.')
		}

		// 패스워드 일치
		const isPasswordValidated: boolean = await bcrypt.compare(
			password,
			cat.password,
		)

		if (!isPasswordValidated) {
			throw new UnauthorizedException('패스워드를 확인해 주세요.')
		}

		const payload = { email, sub: cat.id }

		return {
			token: this.jwtSetvice.sign(payload),
		}
	}
}
