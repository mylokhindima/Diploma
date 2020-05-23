import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { DiplomaEntity } from './diploma.entity';
import { DiplomaStore } from './diplomas.store';
import { CreateReportDTO } from './dtos/create-report.dto';
import { SearchDiplomasQuery } from './dtos/search-diplomas-query.dto';
import { multerOptions } from './options/report-file.options';
import { ReportEntity } from './report.entity';

@ApiTags('Diplomas')
@ApiBearerAuth()
@Controller('diplomas')
export class DiplomasController {
    constructor(private readonly _diplomaStore: DiplomaStore) { }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getStudentDiploma(@Query() query: SearchDiplomasQuery): Promise<DiplomaEntity[]> {
        return await this._diplomaStore.filter(query);
    }

    @Post('reports')
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File',
        type: CreateReportDTO,
    })
    @UseInterceptors(FileInterceptor('file', multerOptions))
    public async uploadReport(@UploadedFile() file, @Body('id') id: string): Promise<ReportEntity> {
        return await this._diplomaStore.createReport(id, file);
    }

    @Get(':id/reports')
    @UseGuards(JwtAuthGuard)
    public async getReports(@Param('id') id: string): Promise<ReportEntity[]> {
        return await this._diplomaStore.findReports(id);
    }
}
