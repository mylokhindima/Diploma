import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { EducationalProgramEntity } from './educational-program.entity';
import { EducationalProgramsStore } from './educational-programs.store';
import { CreateEducationalProgramDTO } from './models/create-educational-program';
import { SearchEducationalProgramQuery } from './models/search-educational-program-query';

@ApiTags('EducationalPrograms')
@ApiBearerAuth()
@Controller('educationalPrograms')
export class EducationalProgramsController {
    constructor(private readonly _educationalProgramsStore: EducationalProgramsStore) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<EducationalProgramEntity[]> {
        return await this._educationalProgramsStore.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(@Query() query: SearchEducationalProgramQuery): Promise<EducationalProgramEntity[]> {
        return await this._educationalProgramsStore.findByDepartmentId(query.departmentId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<EducationalProgramEntity> {
        return await this._educationalProgramsStore.find(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() createDTO: CreateEducationalProgramDTO): Promise<EducationalProgramEntity> {
        return await this._educationalProgramsStore.create(createDTO);
    }
}
