import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async getUsers(): Promise<UserDto> {
    return Promise.resolve({ id: 1, name: 'Jose' });
  }
}
