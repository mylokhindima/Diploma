import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, Put, Param, UploadedFile, Get, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { ArchieveEntity } from './archieve.entity';
import { ArchievesStore } from './archieves.store';
import { CreateArchieveDTO } from './dtos/create-archieve.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../+diplomas/options/report-file.options';
import { CreateArchieveFileDTO } from './dtos/create-archieve-file.dto';

@ApiTags('Archives')
@ApiBearerAuth()
@Controller('archives')
export class ArchivesController {
    constructor(private readonly _archivesStore: ArchievesStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Body() dto: CreateArchieveDTO): Promise<ArchieveEntity> {
        return await this._archivesStore.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<ArchieveEntity[]> {
        return await this._archivesStore.findAll();
    } 

    @Get(':diplomaId')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('diplomaId') diplomaId: string): Promise<ArchieveEntity> {
        return await this._archivesStore.findByDiplomaId(diplomaId);
    } 

    @Post('files')
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File',
        type: CreateArchieveFileDTO,
    })
    @UseInterceptors(FileInterceptor('file', multerOptions("files", ['vnd.openxmlformats-officedocument.presentationml.presentation'])))
    public async uploadReport(@UploadedFile() file, @Body() dto: CreateArchieveFileDTO): Promise<ArchieveEntity> {
        return await this._archivesStore.saveFile(dto, file);
    }

    @Get(':id/generate')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async generate(@Param('id') id: string, @Response() res): Promise<any> {
        const stream = await this._archivesStore.generateArchieve(id);

        res.writeHead(200, {
            'Content-Type': 'application/zip',
        });

        stream.pipe(res);

        stream.finalize();
    }
}
