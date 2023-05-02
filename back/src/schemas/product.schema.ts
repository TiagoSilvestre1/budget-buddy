import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({required: true})
    name: string;

    @Prop({type: Boolean})
    completed: boolean;

    @Prop({required: true, type: [{
         type: mongoose.Types.ObjectId, ref: 'Quote'
    }]})
    quotes: mongoose.Types.ObjectId[];
}

export const ProductShema = SchemaFactory.createForClass(Product);