import { UserEntity } from './user.entity';
import { UserDocument } from '../../documents/user.document';
import { pick } from 'lodash';
import { baseMapper } from '../../base/base.mapper';

export function userMapper(user: UserDocument): UserEntity {
    return new UserEntity({
      ...baseMapper(user),
      ...pick(user, ['name', 'email', 'hash', 'salt', 'roles', 'isActive']),
    });
}