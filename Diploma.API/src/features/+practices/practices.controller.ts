import { SearchPracticesDTO } from './dtos/search-practices.dto';
import { CreatePracticeDTO } from './dtos/create-practice.dto';
import { ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, Body, Get, Query, UploadedFile, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { PracticesStore } from './practices.store';
import { PracticeEntity } from './practice.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../+diplomas/options/report-file.options';
import { ExamineDTO } from './dtos/examine.dto';

@ApiTags('Practices')
@ApiBearerAuth()
@Controller('practices')
export class PracticesController {
    constructor(private readonly _practicesStore: PracticesStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() dto: CreatePracticeDTO): Promise<PracticeEntity> {
        return await this._practicesStore.create(dto);
    }
    
    @Put('update/many')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateMany(@Body() dtos) {
        return await this._practicesStore.update(dtos);
    }

    @Put(':id/examine')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async examine(@Param('id') id: string, @Body() dto: ExamineDTO) {
        return await this._practicesStore.examine(id, dto.score);
    }

    @Put(':id/upload')
    @UseInterceptors(FileInterceptor('file', multerOptions("reports")))
    @UseGuards(JwtAuthGuard)
    public async uploadFile(@Param('id') id: string, @UploadedFile() file) {
        return await this._practicesStore.upload(id, file);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<PracticeEntity[]> {
        return await this._practicesStore.findAll();
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(@Query() query: SearchPracticesDTO): Promise<PracticeEntity[]> {
        return await this._practicesStore.filter(query);
    }

    @Get('student/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getByStudentId(@Param('id') id: string): Promise<PracticeEntity> {
        return await this._practicesStore.findByStudentId(id);
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<PracticeEntity> {
        return await this._practicesStore.find(id);
    }
}
