import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { API } from 'src/api/api';
import mongoose from 'mongoose';


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
    try{
      const success = await this.userService.login(user.email, user.password);
      return {success: success};
    }
    catch(e)
    {
        return {success: false};
    }
  }

  @Post('exist')
  async exist(@Body() user: {email: string})
  {
    try{
      const success = await this.userService.exist(user.email);
      return {success: success};
    }
    catch(e)
    {
        return {success: false};
    }
  }

  @Delete()
  async Remove(@Query('user_id') user_id: mongoose.Types.ObjectId)
  {
    try {
      await this.userService.removeUserById(user_id);
      return {sucess: true}
    }
    catch(error)
    {
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  async getAllUsers()
  {
    try {
      return await this.userService.getAll();
    }
    catch(error)
    {
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
