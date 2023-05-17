import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectShema } from 'src/schemas/project.schema';
import { Service } from 'src/schemas/service.schema';

import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
@Module({
    imports:[MongooseModule.forFeature([{ name: Service.name,  schema:ProjectShema }])],
    providers: [ServiceService],
    controllers: [ServiceController]
})
export class ServiceModule {}
