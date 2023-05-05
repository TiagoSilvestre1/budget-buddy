import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { API } from 'src/api/api';
import { ProjectService } from './project.service';
import { User } from 'src/schemas/user.schema';
import mongoose from 'mongoose';


@Controller('api/project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post('create')
	async createProject(@Body() project: {
		title: string;
		owner_id: string,
		total_budget: number | undefined,
		start_date: any,
		end_date: any
	}): Promise<API>
	{
		try{
			return {data : await this.projectService.create(project.title, project.owner_id, project.total_budget, project.start_date, project.end_date), success: true};
		}
		catch(error)
		{
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('byUserId')
	async findProjectsByUser(@Query('user_id') user_id: mongoose.Types.ObjectId): Promise<API>
	{
		try{
			return {data: {
			owned: await this.projectService.getProjectsOwnedByUserId(user_id),
			collaborates: await this.projectService.getProjectsWhereUserCollaborates(user_id)}, success: true};
		}
		catch(error)
		{    
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('getProjectById')
	async getProjectById(@Query('project_id') project_id: mongoose.Types.ObjectId)
	{
		try{
			return await this.projectService.getProjectById(project_id);
		}
		catch(error)
		{    
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('all')
	async getAll()
	{
		return {
		data: await this.projectService.getAll()
		}
	}

	@Post('addCollaborator')
	async addCollaborator(@Body() info: {
		project_id: mongoose.Types.ObjectId,
		user_id: mongoose.Types.ObjectId
	})
	{
		try{
			return await this.projectService.addCollaborator(info.project_id, info.user_id);
		}
		catch(error)
		{
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Post('addProduct')
	async addProduct(@Body() info: {
		name: string
		project_id: mongoose.Types.ObjectId
	})
	{
		try{
			await this.projectService.addProduct(info);
			return {success: true};
		}
		catch(error)
		{
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('removeProductById')
	async removeProductById(@Query('product_id') product_id: mongoose.Types.ObjectId)
	{
		try{
			return await this.projectService.removeProductById(product_id);
		}
		catch(error)
		{    
			throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
