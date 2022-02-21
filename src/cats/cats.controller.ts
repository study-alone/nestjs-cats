import { Request } from 'express'
import { JwtAuthGuard } from './../auth/jwt/jwt.guard'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CatsService } from './cats.service'
import { CatRequestDto } from './dto/cats.request.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ReadOnlyCatDto } from './dto/cat.dto'
import { AuthService } from 'src/auth/auth.service'
import { LoginRequestDto } from 'src/auth/dto/login.request.dto'
import { CurrentUser } from 'src/common/decorators/user.decorator'

@Controller('cats')
export class CatsController {
	constructor(
		private readonly catsService: CatsService,
		private readonly authService: AuthService,
	) {}

	@ApiOperation({ summary: '회원정보 가져오기' })
	@UseGuards(JwtAuthGuard)
	@Get()
	getCurrentCat(@CurrentUser() cat) {
		return cat.readOnlyData
	}

	@ApiResponse({
		status: 500,
		description: 'Server Error...',
	})
	@ApiResponse({
		status: 200,
		description: 'success',
		type: ReadOnlyCatDto,
	})
	@ApiOperation({ summary: '회원가입' })
	@Post()
	async signUp(@Body() body: CatRequestDto) {
		return await this.catsService.signUp(body)
	}

	@ApiOperation({ summary: '로그인' })
	@Post('login')
	logIn(@Body() data: LoginRequestDto) {
		return this.authService.jwtLogin(data)
	}

	@ApiOperation({ summary: '로그아웃' })
	@Post('logout')
	logOut() {
		return 'logout'
	}

	@ApiOperation({ summary: '이미지 업로드' })
	@Post('upload/cats')
	uploadCatImg() {
		return 'uploadImg'
	}
}
