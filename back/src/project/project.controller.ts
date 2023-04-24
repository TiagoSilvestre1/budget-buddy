import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { API } from 'src/api/api';
import { ProjectService } from './project.service';
import { User } from 'src/schemas/user.schema';


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

  @Get('byUser')
  async getAll(@Query('mail') mail: string): Promise<API>
  {
    try{
        return {data: await this.projectService.getByMail(mail), success: true};
    }
    catch(error)
    {    
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
