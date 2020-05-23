import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../+auth/auth.service';
import { UserDocument } from '../../documents/user.document';
import { UserEntity } from './user.entity';
import { UsersStore } from './users.store';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private _userModel: Model<UserDocument>,
    private _authService: AuthService,
    private _userStore: UsersStore,
   ) {}

  public async findMe(token: string): Promise<UserEntity> {
    const info = this._authService.decodeToken(token);

    const user = await this._userStore.find(info.sub);
    return user;
  }
}
