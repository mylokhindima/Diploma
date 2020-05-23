import { pick } from 'lodash';
import { DepartmentDocument } from './../../documents/department.document';
import { DeparmentMemberDocument } from './../../documents/department-member.document';
import { DepartmentMemberEntity } from './department-member.entity';
import { userMapper } from '../+users/user.mapper';
import { departmentMapper } from '../+departments/department.mapper';

export function departmentMemberMapper(departmentMember: DeparmentMemberDocument): DepartmentMemberEntity {
    const user = userMapper(departmentMember);

    const isDepartmentPopulated = departmentMember.populated('department');

    const partial: Partial<DepartmentMemberEntity> = {
        ...user,
        ...pick(departmentMember, ['degree']),
    };

    if (isDepartmentPopulated) {
        const department = departmentMember.department as DepartmentDocument;

        partial.department = departmentMapper(department);
        partial.departmentId = partial.department.id;
    } else {
        partial.departmentId = departmentMember.department.toString();
        partial.department = null;
    }
    
    return new DepartmentMemberEntity(partial);
}