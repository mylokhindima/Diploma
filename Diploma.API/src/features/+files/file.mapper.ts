import { pick } from 'lodash';
import { FileDocument } from './../../documents/file.document';
import { FileEntity } from './file.entity';
import { baseMapper } from '../../base/base.mapper';

export function fileMapper(file: FileDocument): FileEntity {
    return new FileEntity({
        ...baseMapper(file),
        ...pick(file, ['type', 'path', 'name'])
    });
}