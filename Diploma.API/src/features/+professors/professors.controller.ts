import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { CreateProfessorDTO } from './dtos/create-professor.dto';
import { ProfessorEntity } from './professor.entity';
import { ProfessorsService } from './professors.service';
import { ProfessorsStore } from './professors.store';
import { ProfessorQuery } from './dtos/professor.query';

@ApiTags('Professors')
@ApiBearerAuth()
@Controller('professors')
export class ProfessorsController {
    constructor(
        private readonly _professorsStore: ProfessorsStore,
        private readonly _professorsService: ProfessorsService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() createProfessorDTO: CreateProfessorDTO): Promise<ProfessorEntity> {
        return await this._professorsStore.create(createProfessorDTO);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<ProfessorEntity[]> {
        return await this._professorsStore.findAll();
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(@Query() query: ProfessorQuery): Promise<ProfessorEntity[]> {
        return await this._professorsStore.findByQuery(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<ProfessorEntity> {
        return await this._professorsStore.find(id);
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    public async uploadFile(@UploadedFile() file) {
        return await this._professorsService.upload(file);
    }
}
