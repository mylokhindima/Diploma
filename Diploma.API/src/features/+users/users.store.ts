import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../documents/user.document';
import { UserEntity } from './user.entity';
import { userMapper } from './user.mapper';

@Injectable()
export class UsersStore {
  constructor(
    @InjectModel('User') private _userModel: Model<UserDocument>,
   ) {}

  public async findAll(): Promise<UserEntity[]> {
    const users = await this._userModel.find();
    return users.map(u => userMapper(u));
  }

  public async find(id: string | ObjectID): Promise<UserEntity> {
    const user = await this._userModel.findById(id);
    return user ? userMapper(user) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this._userModel.findOne({ email });
    return user ? userMapper(user) : null;
  }

  public async deactivate(id: string): Promise<void> {
    await this._userModel.findByIdAndUpdate(id, { $set: { isActive: false } });
  }
}
