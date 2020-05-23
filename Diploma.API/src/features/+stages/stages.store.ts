import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Step } from '../../enums/step.enum';
import { StageDocument } from './../../documents/stage.document';
import { StageEntity } from './stage.entity';
import { stageMapper } from './stage.mapper';

@Injectable()
export class StagesStore {
    constructor(
        @InjectModel('Stage') private _stageModel: Model<StageDocument>,
    ) { }

    public async findAll(): Promise<StageEntity[]> {
        const stages = await this._stageModel.find();
        
        return stages.map(s => stageMapper(s));
    }

    public async updateMany(dtos: StageEntity[]): Promise<StageEntity[]> {
        const stages = await this._stageModel.updateMany({}, dtos);
    
        return stages.map(s => stageMapper(s));
    }

    public async findByStep(step: Step): Promise<StageEntity> {
        const stage = await this._stageModel.findOne({
            step,
        });
        
        return stageMapper(stage);
    }
}
