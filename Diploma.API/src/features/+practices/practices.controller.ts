import { CreatePracticeDTO } from './dtos/create-practice.dto';
import { ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, Body, Get, Query, UploadedFile, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { PracticesStore } from './practices.store';
import { PracticeEntity } from './practice.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../+diplomas/options/report-file.options';

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

    @Put(':id/upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @UseGuards(JwtAuthGuard)
    public async uploadFile(@Param('id') id: string, @UploadedFile() file) {
        return await this._practicesStore.upload(id, file);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getByStudentId(@Query('studentId') id: string): Promise<PracticeEntity> {
        return await this._practicesStore.findByStudentId(id);
    }
}
