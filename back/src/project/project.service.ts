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

      await project.save();
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
        return obj;
    }

    async getAll()
    {
        return await this.projectModel.find();
    }

    async removeProjectById(id: mongoose.Types.ObjectId)
    {
        const obj = await this.projectModel.findByIdAndRemove(id);
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

    async getProjectById(project_id: mongoose.Types.ObjectId) {
        const obj = await this.projectModel.findById(project_id);

        if(!obj)
            throw Error('invalid project id');

        return obj;
    }

    async removeProductById(product_id: mongoose.Types.ObjectId) {
        this.productModel.findByIdAndDelete(product_id).exec();
        
        // There is not gonna exist more than one project with the same product_id
        const project_obj = await this.projectModel.findOne({ products: { $in: [product_id] } }).exec();

        if(!project_obj)
            throw Error('Product not associated with project or does not exist');
        
        const index = project_obj.products.indexOf(product_id);

        if(index == -1)
            throw Error('Product is not associated with a project');

        project_obj.products.splice(index, 1);

        // Save the updated `project_obj` document
        await project_obj.save();
    }

    async removeCollaboratorById(person_id: mongoose.Types.ObjectId, project_id: mongoose.Types.ObjectId) {
        // There is not gonna exist more than one project with the same product_id
        const project_obj = await this.projectModel.findById(project_id);

        if(!project_obj)
            throw Error('Project does not exist');
        
        const index = project_obj.collaborators.indexOf(person_id);

        if(index == -1)
            throw Error('Collaborator is not associated with the project');

        project_obj.collaborators.splice(index, 1);

        // Save the updated `project_obj` document
        await project_obj.save();
    }
}