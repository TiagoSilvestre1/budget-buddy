import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://172.16.238.12:27017/', {
    
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
