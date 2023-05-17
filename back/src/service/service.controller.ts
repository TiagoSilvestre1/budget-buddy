import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Query, Res } from '@nestjs/common';
import { API } from 'src/api/api';
import { ServiceService } from './service.service';
import { User } from 'src/schemas/user.schema';
import mongoose from 'mongoose';
import { Response } from 'express';


@Controller('api/service')
export class ServiceController {
	constructor(private readonly serviceService: ServiceService) {}

	
}
