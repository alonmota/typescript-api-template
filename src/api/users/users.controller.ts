import { Controller, Get, HttpStatus, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Version('1')
	@Get()
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Operation successful',
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error',
	})
	getUsers(): Promise<UserDto> {
		return this.userService.getUsers();
	}
}
