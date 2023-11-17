import { Controller, Get, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Version('1')
	@Get()
	getUsers(): Promise<UserDto> {
		return this.userService.getUsers();
	}
}
