import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { ArchieveEntity } from './archieve.entity';
import { ArchievesStore } from './archieves.store';
import { CreateArchieveDTO } from './dtos/create-archieve.dto';

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
}
