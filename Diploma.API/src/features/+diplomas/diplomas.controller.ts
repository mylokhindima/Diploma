import { UpdateDiplomaDTO } from './dtos/update-diploma.dto';
import { SearchDiplomaReports } from './dtos/search-diploma-reports.dto';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors, Param, Put } from '@nestjs/common';
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
    
    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateMany(@Body() dtos: UpdateDiplomaDTO[]): Promise<DiplomaEntity[]> {
        return await this._diplomaStore.updateMany(dtos);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<DiplomaEntity> {
        return await this._diplomaStore.find(id);
    }

    @Post('reports/main')
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File',
        type: CreateReportDTO,
    })
    @UseInterceptors(FileInterceptor('file', multerOptions("reports")))
    public async uploadMainReport(@UploadedFile() file, @Body('id') id: string): Promise<ReportEntity> {
        return await this._diplomaStore.createMainReport(id, file);
    }

    @Post('reports')
    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File',
        type: CreateReportDTO,
    })
    @UseInterceptors(FileInterceptor('file', multerOptions("reports")))
    public async uploadReport(@UploadedFile() file, @Body('id') id: string): Promise<ReportEntity> {
        return await this._diplomaStore.createReport(id, file);
    }

    @Post('reports/comments')
    @UseGuards(JwtAuthGuard)
    public async addComment(@Body() dto: CreateCommentDTO): Promise<ReportEntity> {
        return await this._diplomaStore.addComment(dto.reportId, dto.comment);
    }

    @Put(':id/instructor/accept')
    @UseGuards(JwtAuthGuard)
    public async acceptByInstructor(@Param('id') id): Promise<void> {
        return await this._diplomaStore.acceptByInstructor(id);
    }

    @Put(':id/plagiarism/accept')
    @UseGuards(JwtAuthGuard)
    public async passPlagiarism(@Param('id') id): Promise<void> {
        return await this._diplomaStore.passPlagiarism(id);
    }

    @Put(':id/plagiarism/decline')
    @UseGuards(JwtAuthGuard)
    public async failPlagiarism(@Param('id') id): Promise<void> {
        return await this._diplomaStore.failPlagiarism(id);
    }

    @Put(':id/normscontrol/accept')
    @UseGuards(JwtAuthGuard)
    public async passNormscontrol(@Param('id') id): Promise<void> {
        return await this._diplomaStore.passNormscontrol(id);
    }

    @Get('reports/main/filter')
    @UseGuards(JwtAuthGuard)
    public async filterReports(@Query() dto: SearchDiplomaReports): Promise<ReportEntity[]> {
        return await this._diplomaStore.filterMainReports(dto);
    }

    @Get('reports/:reportId')
    @UseGuards(JwtAuthGuard)
    public async getReport(@Param('reportId') reportId: string): Promise<ReportEntity> {
        return await this._diplomaStore.findReport(reportId);
    }

    @Get(':id/reports')
    @UseGuards(JwtAuthGuard)
    public async getReports(@Param('id') id: string): Promise<ReportEntity[]> {
        return await this._diplomaStore.findReports(id);
    }

}
