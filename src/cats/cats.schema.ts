import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Document } from 'mongoose'

@Schema({
	timestamps: true,
})
export class Cat extends Document {
	@ApiProperty({
		example: 'wowowo11@naver.com',
		description: '이메일 주소',
		required: true,
	})
	@Prop({
		required: true,
		unique: true,
	})
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({
		example: 'aurora1010',
		description: '사용자 이름(닉네임)',
		required: true,
	})
	@Prop()
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		example: '121212sdsd',
		description: '비밀번호',
		required: true,
	})
	@Prop({
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	password: string

	@Prop()
	@IsString()
	imgUrl: string

	readonly readOnlyData: { id: string; email: string; name: string }
}

export const CatSchema = SchemaFactory.createForClass(Cat)

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
	return {
		id: this.id,
		email: this.email,
		name: this.name,
	}
})
