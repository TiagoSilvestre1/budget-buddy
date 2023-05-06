import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as mongoose from 'mongoose';
import { Service } from "src/schemas/service.schema";
@Injectable()
export class ServiceService {
    constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}
}