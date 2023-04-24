import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/schemas/project.schema";

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


    async getByMail(mail: string)
    {
        return await this.projectModel.find(
            {
                owner: {
                    mail: mail
                }
            }
        );
    }
}