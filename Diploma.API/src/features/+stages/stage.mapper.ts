import { pick } from 'lodash';
import { StageDocument } from '../../documents/stage.document';
import { StageEntity } from './stage.entity';
import { baseMapper } from '../../base/base.mapper';

export function stageMapper(stage: StageDocument): StageEntity {
    return new StageEntity({
      ...baseMapper(stage),
      ...pick(stage, ['endDate', 'step']),
    });
}