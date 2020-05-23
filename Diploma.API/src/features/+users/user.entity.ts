import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../base/base.entity';
import { Role } from '../../enums/role.enum';

export class UserEntity extends BaseEntity<UserEntity> {
    name: string;
    email: string;
    @Exclude()
    hash: string;
    @Exclude()
    salt: string;
    roles: Role[];
    isActive: boolean;
}