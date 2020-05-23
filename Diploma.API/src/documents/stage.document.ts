import { Document } from 'mongoose';
import { Step } from '../enums/step.enum';

export class StageDocument extends Document { 
    endDate: Date;
    step: Step;
}