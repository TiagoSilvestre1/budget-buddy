import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {Product, ProductShema} from 'src/schemas/product.schema';
import { Quote, QuoteShema} from 'src/schemas/quote.schema';
@Module({
    imports:[MongooseModule.forFeature([{ name: Quote.name,  schema:QuoteShema },{ name: Product.name,  schema:ProductShema }])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}
