import { DepartmentEntity } from './../+departments/department.entity';
import { UserEntity } from './../+users/user.entity';

export class DepartmentMemberEntity extends UserEntity {
    degree: number;
    departmentId: string;
    department?: DepartmentEntity;
}