import { ClassSerializerInterceptor, Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { EducationalProgramEntity } from './educational-program.entity';
import { EducationalProgramsStore } from './educational-programs.store';

@ApiTags('EducationalPrograms')
@ApiBearerAuth()
@Controller('educationalPrograms')
export class EducationalProgramsController {
    constructor(private readonly _educationalProgramsStore: EducationalProgramsStore) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<EducationalProgramEntity[]> {
        return await this._educationalProgramsStore.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async get(@Param('id') id: string): Promise<EducationalProgramEntity> {
        return await this._educationalProgramsStore.find(id);
    }
}
