import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async create(name: string, email: string, password: string) {

		const _id = new mongoose.Types.ObjectId();
		let obj = {
		name: name,
		email: email,
		password: password,
		_id: _id
		};

		await this.userModel.create(obj);
		return obj;
	}

	async removeUserById(user_id: mongoose.Types.ObjectId)
	{
		await this.userModel.findByIdAndRemove(user_id);
	}

	async login(email: string, password: string)
	{
		console.log(await this.userModel.findOne({email: email, password: password}))
		return await this.userModel.findOne({email: email, password: password});
	}

	async exist(email: string): Promise<boolean>
	{
		if(await this.userModel.findOne({email: email})) return true;
		return false;
	}

	async getAll()
	{
		return await this.userModel.find();
	}

	async getById(id: mongoose.Types.ObjectId)
	{
		const _user = await this.userModel.findById(id);

		if(!_user) 
			throw Error('invalid user id');

			return {email: _user.email,
				name: _user.name,
				id: _user._id
			};
	}

	async getByEmail(email: String)
	{
		const _user = await this.userModel.findOne({email: email});

		if(!_user) 
			throw Error('invalid user id');
		
		return {email: _user.email,
				name: _user.name,
				id: _user._id
			};
	}
}
