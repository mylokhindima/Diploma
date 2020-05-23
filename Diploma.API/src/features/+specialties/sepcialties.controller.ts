import { SpecialtyEntity } from './specialty.entity';
import { CreateSpecialtyDTO } from './dtos/create-specialty.dto';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { Controller, Get, Param, UseGuards, ClassSerializerInterceptor, UseInterceptors, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SpecialtiesStore } from './specialties.store';

@ApiTags('Specialties')
@ApiBearerAuth()
@Controller('specialties')
export class SpecialtiesController {
    constructor(private readonly _specialtiesStore: SpecialtiesStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() createSpecialtyDTO: CreateSpecialtyDTO): Promise<SpecialtyEntity> {
        return await this._specialtiesStore.create(createSpecialtyDTO);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<SpecialtyEntity[]> {
        return await this._specialtiesStore.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<SpecialtyEntity> {
        return await this._specialtiesStore.find(id);
    }
}
