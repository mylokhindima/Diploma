import { Base } from './base';
import { Specialty } from './specialty';
import { Professor } from './proffesor';

export interface Department extends Base {
  name: string;
  specialtiesIds: string[];
  specialties: Specialty[];
  responsible: Professor;
  responsibleId: string;
}
