import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string, email: string, password: string): Promise<mongoose.Types.ObjectId> {

    const _id = new mongoose.Types.ObjectId();
    let obj = {
      name: name,
      email: email,
      password: password,
      _id: _id
    };

    await this.userModel.create(obj);
    return _id;
  }

  async login(email: string, password: string): Promise<boolean>
  {
    if(await this.userModel.findOne({email: email, password: password})) return true;
    return false;
  }
}
