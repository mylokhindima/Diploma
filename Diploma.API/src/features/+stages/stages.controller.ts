import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors, Put, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { StageEntity } from './stage.entity';
import { StagesStore } from './stages.store';

@ApiTags('Stages')
@ApiBearerAuth()
@Controller('stages')
export class StagesController {
    constructor(private readonly _stagesStore: StagesStore) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAll(): Promise<StageEntity[]> {
        return await this._stagesStore.findAll();
    }

    
    @Put('many')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateMany(@Body() dtos: StageEntity[]): Promise<StageEntity[]> {
        return await this._stagesStore.updateMany(dtos);
    }
}
