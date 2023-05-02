import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/schemas/project.schema";
import { Product } from "src/schemas/product.schema";
import * as mongoose from 'mongoose';
@Injectable()
export class ProjectService {

    async addProduct(info: {
        name: string
        project_id: mongoose.Types.ObjectId
      }) {

        const obj = new this.productModel({
            name: info.name,
            completed: false,
            quotes: []
            });

      await obj.save();

      const project = await this.projectModel.findById(info.project_id).exec();

      project.products.push(obj.id);
    }

    constructor(@InjectModel(Project.name) private projectModel: Model<Project>, @InjectModel(Product.name) private productModel: Model<Product>) {}
    
    async create(title: string, owner_id: string, total_budget: number, start_date: any, end_date: any) {
        const obj = new this.projectModel({
            title: title,
            owner: owner_id,
            budget: total_budget,
            start_date: start_date,
            finish_date: end_date
        });
        
        await obj.save();
    }

    async getAll()
    {
        return await this.projectModel.find();
    }
    
    
    async addCollaborator(project_id: mongoose.Types.ObjectId, user_id: mongoose.Types.ObjectId) {
        const project = await this.projectModel.findById(project_id).exec();

        project.collaborators.push(user_id);
        await project.save();

    }


    async getProjectsOwnedByUserId(user_id: mongoose.Types.ObjectId)
    {
        return await this.projectModel.find(
            {
                owner: user_id
            }
        );
    }

    async getProjectsWhereUserCollaborates(user_id: mongoose.Types.ObjectId)
    {
        return await this.projectModel.find({
            collaborators: {
                $in: [user_id]
            }
        });
    }
}