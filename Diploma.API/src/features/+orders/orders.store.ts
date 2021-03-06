import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workbook } from 'exceljs';
import * as fs from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { DiplomaEntity } from '../+diplomas/diploma.entity';
import { educationalProgramMapper } from '../+educational-program/educational-program.mapper';
import { FileType } from '../../enums/file-type.enum';
import { DiplomaStore } from './../+diplomas/diplomas.store';
import { FilesStore } from './../+files/files.store';
import { PracticeEntity } from './../+practices/practice.entity';
import { PracticesStore } from './../+practices/practices.store';
import { StudentEntity } from './../+students/student.entity';
import { StudentsStore } from './../+students/students.store';
import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { FileDocument } from './../../documents/file.document';
import { OrderDocument } from './../../documents/order.document';
import { OrderType } from './../../enums/order-type.enum';
import { Step } from './../../enums/step.enum';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { DiplomaOrderBuilder } from './excel-builders/diploma-order.builder';
import { ExcelBuilder } from './excel-builders/excel-builder.interface';
import { PracticeOrderBuilder } from './excel-builders/practice-order.builder';
import { OrderEntity } from './order.entity';
import { orderMapper } from './order.mapper';
import path = require('path');


@Injectable()
export class OrdersStore {
    constructor(
        @InjectModel('Order') private _orderModel: Model<OrderDocument>,
        @InjectModel('File') private _fileModel: Model<FileDocument>,
        @InjectModel('EducationalProgram') private _educationalProgramModel: Model<EducationalProgramDocument>,
        private _studentsStore: StudentsStore,
        private _diplomasStore: DiplomaStore,
        private _practiceStore: PracticesStore,
        private _filesStore: FilesStore,
    ) { }

    public async create(dto: CreateOrderDTO): Promise<OrderEntity> {
        const educationalProgram = educationalProgramMapper(
            await this._educationalProgramModel.findById(dto.educationalProgramId).populate({
                path: 'specialty',
                populate: {
                    path: 'department',
                }
            })
        );

        const students = await this._studentsStore.findByEducationalProgramId(educationalProgram.id);

        const diplomas = (await Promise.all(students.map(s => this._diplomasStore.filter({
            studentId: s.id
        })))).map(d => d[0]);
        
        let map;
        let builder: ExcelBuilder;

        if (dto.type === OrderType.Diploma) {
            map = diplomas.map((d, i) => ([students[i], d])).filter(([s, d]) => !!d && (d as DiplomaEntity).stage.step === Step.PracticeReport) as [StudentEntity, DiplomaEntity][];
            builder = new DiplomaOrderBuilder(educationalProgram, dto.startDate, dto.endDate); 
        } else {
            const practices = (await Promise.all(students.map(s => this._practiceStore.findByStudentId(s.id))));
            map = diplomas.map((d, i) => ([students[i], d, practices[i]])).filter(([s, d, p]) => !!d && !!p && (d as DiplomaEntity).stage.step === Step.PracticeDistribution) as [StudentEntity, DiplomaEntity, PracticeEntity][];
            builder = new PracticeOrderBuilder(educationalProgram, dto.startDate, dto.endDate);
        }

        const workbook = await builder.build(map);

        const path = await this._saveExcelFile(educationalProgram.name, workbook);

        const name = `Наказ на ${OrderType.Diploma === dto.type ? 'дипломування' : 'практику'} (${educationalProgram.name}).xlsx`  

        const file = await this._filesStore.create({
            path,
            type: dto.type === OrderType.Diploma ? FileType.GraduationOrder : FileType.PracticeOrder,
            name,
        });

        const order = await this._orderModel.create({
            educationalProgram: educationalProgram.id, 
            file: file.id,
            startDate: dto.startDate,
            endDate: dto.endDate,
        });

        return orderMapper(order);
    }

    public async filter(departmentId: string): Promise<OrderEntity[]> {
        const orders = await this._orderModel.find().populate({
            path: 'educationalProgram',
            populate: {
                path: 'specialty'
            }    
        }).populate('file') as any;

        return orders.filter(o => o.educationalProgram.specialty.department.toString() === departmentId).map(o => orderMapper(o));
    }

    public async approve(id: string): Promise<OrderEntity> {
        const order = await this._orderModel.findByIdAndUpdate(id, {
            approved: true,
        }).populate('file').populate('educationalProgram');

        const students = await this._studentsStore.findByEducationalProgramId((order.educationalProgram as EducationalProgramDocument).id);

        const diplomas = (await Promise.all(students.map(s => this._diplomasStore.filter({
            studentId: s.id
        })))).map(d => d[0]);
        
        const type = (order.file as FileDocument).type;

        if (type === FileType.PracticeOrder) {
            await Promise.all(diplomas.filter(d => d.stage.step ===  Step.PracticeDistribution).map(d => {
                this._diplomasStore.updateDiplomaStage(d.id, Step.PracticeReport)
            }));
        } else if (type === FileType.GraduationOrder) {
            await Promise.all(diplomas.filter(d => d.stage.step ===  Step.PracticeReport).map(d => {
                this._diplomasStore.updateDiplomaStage(d.id, Step.DiplomaReport)
            }));
        }

        return orderMapper(await this._orderModel.findById(order.id).populate('file').populate('educationalProgram'));
    }

    public async findByFileId(id: string): Promise<OrderEntity> {
        const order = await this._orderModel.findOne({
            file: id, 
        }).populate('file');

        return orderMapper(order);
    }

    public async removeOrder(id: string): Promise<void> {
        const order = await this._orderModel.findById(id).populate('file');

        fs.unlinkSync(path.resolve(`${process.cwd()}/public/orders/${(order.file as FileDocument).path}`));

        await this._fileModel.findByIdAndRemove(order.file);
        await this._orderModel.findByIdAndRemove(id);
    } 

    private async _saveExcelFile(name: string, workbook: Workbook): Promise<string> {
        const uploadPath = path.resolve(process.cwd() + "/public/orders");

        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, {
                recursive: true
            });
        }

        const fileName = `${uuid()}.xlsx`;

        const filePath = `${uploadPath}/${fileName}`;

        await workbook.xlsx.writeFile(filePath);

        return fileName;
    }
}
