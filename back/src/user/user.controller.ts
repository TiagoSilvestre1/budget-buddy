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
			const obj = await this.userService.create(user.name, user.email, user.password);
			return {success: true, data: {main: obj.email, name: obj.name, id: obj._id}};
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
		const _user = await this.userService.login(user.email, user.password);
		if(_user)
		{
			return {success: true, data: {
			mail: _user.email,
			name: _user.name,
			id: _user._id
			}}
		}
		else{
			return {success: false};
		}
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

	@Get('userById')
	async userById(@Query('user_id') user_id: mongoose.Types.ObjectId)
	{
		try {
			return await this.userService.getById(user_id);
		}
		catch(error)
		{
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('userByEmail')
	async userByEmail(@Query('email') email: string)
	{
		try {
			return await this.userService.getByEmail(email);
		}
		catch(error)
		{
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
