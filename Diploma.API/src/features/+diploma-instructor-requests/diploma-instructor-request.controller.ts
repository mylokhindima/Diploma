import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { DiplomaInstructorRequestEntity } from './diploma-instructor-request.entity';
import { DiplomaInstructorRequestsStore } from './diploma-instructor-requests.store';
import { AcceptRequestDTO } from './dtos/accept-request.dto';
import { CreateDiplomaInstructorRequest } from './dtos/create-diploma-instructor-request.dto';
import { SearchRequestsQuery } from './dtos/search-requests-query';
import { DeclineRequestDTO } from './models/decline-request.dto';

@ApiTags('DiplomaInstructorRequests')
@ApiBearerAuth()
@Controller('diplomaInstructorRequests')
export class DiplomaInstructorRequestsController {
    constructor(
        private readonly _diplomaInstructorRequestsStore: DiplomaInstructorRequestsStore,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<DiplomaInstructorRequestEntity[]> {
        return await this._diplomaInstructorRequestsStore.findAll();
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async filter(@Query() query: SearchRequestsQuery): Promise<DiplomaInstructorRequestEntity[]> {
        return await this._diplomaInstructorRequestsStore.filter(query);
    }

    @Post('accept')
    @UseGuards(JwtAuthGuard)
    public async accept(@Request() req, @Body() dto: AcceptRequestDTO): Promise<void> {
        await this._diplomaInstructorRequestsStore.accept(dto.requestId, req.user.id);
    }

    @Post('decline')
    @UseGuards(JwtAuthGuard)
    public async decline(@Request() req, @Body() dto: DeclineRequestDTO): Promise<void> {
        await this._diplomaInstructorRequestsStore.decline(dto, req.user.id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async create(@Request() req, @Body() createRequestDTO: CreateDiplomaInstructorRequest): Promise<DiplomaInstructorRequestEntity> {
        createRequestDTO.fromId = req.user.id;
        return await this._diplomaInstructorRequestsStore.create(createRequestDTO);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<DiplomaInstructorRequestEntity> {
        return await this._diplomaInstructorRequestsStore.find(id);
    }
}
