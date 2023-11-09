import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
	@ApiProperty()
	meta: any;

	@ApiProperty()
	data: any;
}
