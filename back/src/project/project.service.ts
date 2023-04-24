import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/schemas/project.schema";
import * as mongoose from 'mongoose';
@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}
    
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
    
    
    async addCollaborator(project_id: mongoose.Types.ObjectId, user_id: mongoose.Types.ObjectId) {
        const project = await this.projectModel.findById(project_id).exec();

        project.collaborators.push(user_id);
        await project.save();

    }


    async getProjectsOwnedByUserId(user_id: mongoose.Types.ObjectId)
    {
        return await this.projectModel.find(
            {
                owner: {
                    _id: user_id
                }
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