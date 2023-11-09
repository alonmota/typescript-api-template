import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({
		description: 'User Id',
	})
	id: number;

	@ApiProperty({
		description: 'User name',
	})
	name: string;
}
