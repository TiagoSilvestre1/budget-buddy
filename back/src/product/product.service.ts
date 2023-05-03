import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/product.schema";
import { Quote } from 'src/schemas/quote.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductService {
    
    
    constructor(@InjectModel(Product.name) private productModel: Model<Product>, 
    @InjectModel(Quote.name) private quoteModel: Model<Quote>) {}
    
    async setCompleted(product_id: mongoose.Types.ObjectId, new_state: boolean)
    {
        const obj = await this.productModel.findById(product_id);
        obj.completed = new_state;
        await obj.save();
    }
    
    async getProductById(product_id: mongoose.Types.ObjectId) {
      return await this.productModel.findById(product_id);
    }

    async getQuoteById(quote_id: mongoose.Types.ObjectId) {
      return await this.quoteModel.findById(quote_id);
    }

    async addQuote(product_id: mongoose.Types.ObjectId , url: string | null, description: string | null, price: number | null, available: Date | null)
    {
        const obj = await this.productModel.findById(product_id);

        const quote = new this.quoteModel();

        quote.url = url;
        quote.description = description;
        quote.price = price;
        quote.available = available;

        await quote.save();
        
        obj.quotes.push(quote.id);

        await obj.save();
    }

    async modifyQuote(quote_id: mongoose.Types.ObjectId,  url: string | null, description: string | null, price: number | null, available: Date | null)
    {
        const obj = await this.quoteModel.findById(quote_id);
        obj.url = url;
        obj.description = description;
        obj.price = price;
        obj.available = available
        await obj.save();
    }

    async destroyQuote(quote_id: mongoose.Types.ObjectId)
    {
        const obj = await this.quoteModel.findByIdAndDelete(quote_id);
        await obj.save();
    }

    async getAll()
    {
        return await this.productModel.find();
    }

}