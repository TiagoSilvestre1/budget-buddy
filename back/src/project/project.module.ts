import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectShema } from 'src/schemas/project.schema';
import { ProjectService } from './project.service';
import { Project } from 'src/schemas/project.schema';
import { ProjectController } from './project.controller';

@Module({
    imports:[MongooseModule.forFeature([{ name: Project.name,  schema:ProjectShema }])],
    providers: [ProjectService],
    controllers: [ProjectController]
})
export class ProjectModule {}
