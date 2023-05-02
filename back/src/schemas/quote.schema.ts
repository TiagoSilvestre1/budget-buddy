import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {
    @Prop({required: false, type: String})
    url: string;

    @Prop({required: false, type: String})
    description: string;
    
    @Prop({required: false, type: Number})
    price: number;

    @Prop({required: false, type: Date})
    available: Date;
}

export const QuoteShema = SchemaFactory.createForClass(Quote);