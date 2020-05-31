import { TimeSectionEntity } from './entities/time-section.entity';
import { CreateTimeSectionDTO } from './dtos/create-time-section.dto';
import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { DiplomaProtectionEntity } from './entities/diploma-protection.entity';
import { DiplomaProtectionsStore } from './diploma-protections.store';
import { CreateDiplomaProtectionDTO } from './dtos/create-diploma-protection.dto';

@ApiTags('DiplomaProtections')
@ApiBearerAuth()
@Controller('diplomaProtections')
export class DiplomaProtectionsController {
    constructor(private readonly _store: DiplomaProtectionsStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() dto: CreateDiplomaProtectionDTO): Promise<DiplomaProtectionEntity> {
        return await this._store.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<DiplomaProtectionEntity[]> {
        return await this._store.findAll();
    }

    @Get('educationalProgram/:educationalProgramId')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findByEducationProgram(@Param('educationalProgramId') id: string): Promise<DiplomaProtectionEntity[]> {
        return await this._store.findByEducationalProgram(id);
    }

    @Post('timesections')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async createTimeSection(@Body() dto: CreateTimeSectionDTO): Promise<TimeSectionEntity> {
        return await this._store.createTimeSection(dto);
    }
}
