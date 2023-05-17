import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
    @Prop({required: true})
    name: string;

    @Prop({type: Boolean})
    completed: boolean;

    @Prop({type: Date})
    start_date: Date;

    @Prop({type: Date})
    end_date: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);