import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Version('1')
	@Get()
	@HttpCode(HttpStatus.OK)
	getUsers(): Promise<UserDto> {
		return this.userService.getUsers();
	}
}
