import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { API } from 'src/api/api';
import { ProductService } from './product.service';
import { User } from 'src/schemas/user.schema';
import mongoose, { Mongoose, mongo } from 'mongoose';


@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get()
  {
    return 'api/product endpoint is active'
  }

    @Post('setQuoteCompletedStatus')
    async setQuoteCompletedStatus(@Body() info: {
        id: mongoose.Types.ObjectId,
        completed: boolean
    })
    {
        try{
            await this.productService.setCompleted(info.id,info.completed);
            return HttpStatus.OK;
        }
        catch(error)
        {
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

  @Get('productById')
  async getProductById(@Query('id') product_id: mongoose.Types.ObjectId)
  {
    try{
      return await this.productService.getProductById(product_id);
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
      data: await this.productService.getAll()
    }
  }

@Get('quoteById')
  async getQuoteById(@Query('id') quote_id: mongoose.Types.ObjectId)
  {
    try{
      return await this.productService.getQuoteById(quote_id);
    }
    catch(error)
    {
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('addQuote')
  async addQuote(@Body() info: {
    product_id: mongoose.Types.ObjectId
    quote: {
    description: string | null
    url: string | null,
    price: number | null,
    available: Date | null,
    available_2: Date | null,
    }
  })
  {
    try{
        await this.productService.addQuote(info.product_id, info.quote.url,info.quote.description, info.quote.price, info.quote.available, info.quote.available_2);
        return HttpStatus.OK;
      }
      catch(error)
      {
        throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Post('modifyQuote')
  async modifyQuote(@Body() info: {
    description: string | null
    url: string | null,
    price: number | null,
    available: Date | null,
    available_2: Date | null,
    _id: mongoose.Types.ObjectId
    
    })
    {
        try{
            await this.productService.modifyQuote(info._id, info.url,info.description, info.price, info.available, info.available_2);
            return HttpStatus.OK;
        }
        catch(error)
        {
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('removeQuote')
    async removeQuote(@Body() info: {id: mongoose.Types.ObjectId})
    {
        try{
            return await this.productService.destroyQuote(info.id);
        }
        catch(error)
        {
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
