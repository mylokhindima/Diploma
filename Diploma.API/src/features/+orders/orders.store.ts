import { FilesStore } from './../+files/files.store';
import { EducationalProgramEntity } from './../+educational-program/educational-program.entity';
import { EducationalForm } from './../../enums/educational-form.enum';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiplomaEntity } from '../+diplomas/diploma.entity';
import { educationalProgramMapper } from '../+educational-program/educational-program.mapper';
import { StudentEntity } from '../+students/student.entity';
import { DiplomaStore } from './../+diplomas/diplomas.store';
import { StudentsStore } from './../+students/students.store';
import { EducationalProgramDocument } from './../../documents/educational-program.document';
import { OrderDocument } from './../../documents/order.document';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { DiplomaOrderBuilder } from './excel-builders/diploma-order.builder';
import path = require('path');
import { existsSync, mkdirSync } from 'fs';
import { StudentDegree } from '../../enums/student-degree.enum';
import { Workbook } from 'exceljs';
import { FileType } from '../../enums/file-type.enum';
import { OrderEntity } from './order.entity';
import { orderMapper } from './order.mapper';


@Injectable()
export class OrdersStore {
    constructor(
        @InjectModel('Order') private _orderModel: Model<OrderDocument>,
        @InjectModel('EducationalProgram') private _educationalProgramModel: Model<EducationalProgramDocument>,
        private _studentsStore: StudentsStore,
        private _diplomasStore: DiplomaStore,
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
        
        const map = diplomas.map((d, i) => ([students[i], d])).filter(([s, d]) => !!d) as [StudentEntity, DiplomaEntity][];

        const builder = new DiplomaOrderBuilder(educationalProgram, dto.startDate, dto.endDate);

        const workbook = await builder.build(map);

        const fileName = await this._saveExcelFile(educationalProgram, workbook);

        const file = await this._filesStore.create({
            path: fileName,
            type: FileType.GraduationOrder,
            name: fileName,
        });

        const order = await this._orderModel.create({
            educationalProgram: educationalProgram.id, 
            file: file.id,
            startDate: dto.startDate,
            endDate: dto.endDate,
        });

        return orderMapper(order);
    }

    private async _saveExcelFile(educationalProgram: EducationalProgramEntity, workbook: Workbook): Promise<string> {
        const uploadPath = path.resolve(process.cwd() + "/public/orders");

        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, {
                recursive: true
            });
        }

        let form: string;
        let degree = educationalProgram.degree === StudentDegree.Bachelor ? 'bac' : 'mag';

        switch(educationalProgram.form) {
            case EducationalForm.DayTime: 
                form = 'day';
                break;
            case EducationalForm.Extramural:
                form = 'extr';
                break;
            case EducationalForm.Remote:
                form = 'rem';
                break;
            default:
        }

        const fileName = `${educationalProgram.specialty.name}-${degree}-${form}.xlsx`;

        const filePath = `${uploadPath}/${fileName}`;

        await workbook.xlsx.writeFile(filePath);

        return fileName;
    }
}
