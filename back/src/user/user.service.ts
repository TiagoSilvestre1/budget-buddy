import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const createdCat = new this.userModel({
        name: name,
        email: email,
        password: password
    });

    return createdCat.save();
  }

  async login(email: string, password: string): Promise<boolean>
  {
    if(await this.userModel.findOne({email: email, password: password})) return true;
    return false;
  }
}
