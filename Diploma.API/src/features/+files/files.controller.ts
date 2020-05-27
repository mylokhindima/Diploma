import { Body, ClassSerializerInterceptor, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, Query, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from '../+diplomas/options/report-file.options';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { CreateFileDTO } from './dto/create-file.dto';
import { SearchFileDTO } from './dto/search-file.dto';
import { FileEntity } from './file.entity';
import { FilesStore } from './files.store';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
    constructor(private readonly _filesStore: FilesStore) { }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Query() dto: SearchFileDTO): Promise<FileEntity[]> {
        return await this._filesStore.filter(dto);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerOptions("files")))
    public async create(@Body() createDTO: CreateFileDTO, @UploadedFile() file): Promise<FileEntity> {
        return await this._filesStore.create({
            type: createDTO.type,
            path: file.filename,
            name: file.originalname
        });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async delete(@Param('id') id): Promise<void> {
        return await this._filesStore.delete(id);
    }
}
