import { Base } from './base';
import { Specialty } from './specialty';

export interface Department extends Base {
  name: string;
  specialtiesIds: string[];
  specialties: Specialty[];
}
