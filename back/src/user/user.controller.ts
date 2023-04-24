import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { API } from 'src/api/api';


@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() user: {
    name: string,
    email: string,
    password: string
  }): Promise<API>
  {
    try{
        const _id = await this.userService.create(user.name, user.email, user.password);
        return {success: true, data: _id};
    }
    catch(e)
    {
        return {
            success: false
        };
    }
  }

  @Post('login')
  async login(@Body() user: {email: string, password: string})
  {
    
  }

}
