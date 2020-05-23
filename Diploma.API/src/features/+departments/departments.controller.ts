import { CreateDepartmentDTO } from './dtos/create-department.dto';
import { DepartmentsStore } from './departments.store';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards, ClassSerializerInterceptor, UseInterceptors, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DepartmentEntity } from './department.entity';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {
    constructor(private readonly _departmentsStore: DepartmentsStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() createDepartmentDTO: CreateDepartmentDTO): Promise<DepartmentEntity> {
        return await this._departmentsStore.create(createDepartmentDTO);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<DepartmentEntity[]> {
        return await this._departmentsStore.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<DepartmentEntity> {
        return await this._departmentsStore.find(id);
    }
}
