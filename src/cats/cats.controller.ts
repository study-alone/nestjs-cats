import {
	Body,
	Controller,
	Get,
	Post,
	UseFilters,
	UseInterceptors,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter'
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe'
import { SuccessInterceptor } from '../common/interceptors/success.interceptor'
import { CatRequestDto } from './dto/cats.request.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ReadOnlyCatDto } from './dto/cat.dto'

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

	@ApiOperation({ summary: '회원정보 가져오기' })
	@Get()
	getCurrentCat() {
		return 'current cat'
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
	logIn() {
		return 'login'
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
