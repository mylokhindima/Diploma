import { BaseEntity } from '../../base/base.entity';
import { Step } from "../../enums/step.enum";

export class StageEntity extends BaseEntity<StageEntity> {
    endDate?: Date;
    step: Step;
}