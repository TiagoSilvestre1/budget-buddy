import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
    @Prop({required: true})
    title: string;
  
    @Prop({type: Date})
    start_date: Date;
  
    @Prop({type: Date})
    finish_date: Date;
  
    @Prop({type: Number})
    budget: number;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref: 'User'})
    owner: User;



  


}

export const ProjectShema = SchemaFactory.createForClass(Project);