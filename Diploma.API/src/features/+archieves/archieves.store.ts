import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchieveDocument } from '../../documents/archive.document';
import { ArchieveEntity } from './archieve.entity';
import { archiveMapper } from './archive.mapper';
import { CreateArchieveDTO } from './dtos/create-archieve.dto';



@Injectable()
export class ArchievesStore {
    constructor(
        @InjectModel('Archieve') private _archiveModel: Model<ArchieveDocument>,
    ) { }

    public async create(dto: CreateArchieveDTO): Promise<ArchieveEntity> {
        const archive = await this._archiveModel.create({
            diplomaReport: dto.diplomaReportId,
        });

        return archiveMapper(archive);
    }
}
