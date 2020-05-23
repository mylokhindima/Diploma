import { DeclineRequestDTO } from './../+diploma-instructor-requests/models/decline-request.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { DiplomaInstructorThemeRequestEntity } from './diploma-instructor-theme-request.entity';
import { DiplomaInstructorThemeRequestsStore } from './diploma-instructor-theme-requests.store';
import { CreateDiplomaInstructorThemeRequestDTO } from './dtos/create-diploma-instructor-theme-request.dto';
import { AcceptRequestDTO } from '../+diploma-instructor-requests/dtos/accept-request.dto';
import { SearchRequestsQuery } from '../+diploma-instructor-requests/dtos/search-requests-query';

@ApiTags('DiplomaInstructorThemeRequests')
@ApiBearerAuth()
@Controller('diplomaInstructorThemeRequests')
export class DiplomaInstructorThemeRequestsController {
    constructor(
        private readonly _diplomaInstructorThemeRequestsStore: DiplomaInstructorThemeRequestsStore,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<DiplomaInstructorThemeRequestEntity[]> {
        return await this._diplomaInstructorThemeRequestsStore.findAll();
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(@Query() query: SearchRequestsQuery): Promise<DiplomaInstructorThemeRequestEntity[]> {
        return await this._diplomaInstructorThemeRequestsStore.filter(query);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Request() req, @Body() createRequestDTO: CreateDiplomaInstructorThemeRequestDTO): Promise<DiplomaInstructorThemeRequestEntity> {
        createRequestDTO.fromId = req.user.id;
        return await this._diplomaInstructorThemeRequestsStore.create(createRequestDTO);
    }

    @Post('professor/accept')
    @UseGuards(JwtAuthGuard)
    public async professorAccept(@Request() req, @Body() dto: AcceptRequestDTO): Promise<void> {
        await this._diplomaInstructorThemeRequestsStore.acceptByProfessor(dto.requestId, req.user.id);
    }

    @Post('professor/decline')
    @UseGuards(JwtAuthGuard)
    public async professorDecline(@Request() req, @Body() dto: DeclineRequestDTO): Promise<void> {
        await this._diplomaInstructorThemeRequestsStore.declineByProfessor(dto, req.user.id);
    }

    @Post('commission/accept')
    @UseGuards(JwtAuthGuard)
    public async commissionAccept(@Request() req, @Body() dto: AcceptRequestDTO): Promise<void> {
        await this._diplomaInstructorThemeRequestsStore.acceptByMethodologicalCommission(dto.requestId, req.user.id);
    }

    @Post('commission/decline')
    @UseGuards(JwtAuthGuard)
    public async commissionDecline(@Request() req, @Body() dto: DeclineRequestDTO): Promise<void> {
        await this._diplomaInstructorThemeRequestsStore.declinedByMethodologicalCommission(dto, req.user.id);
    }
}
