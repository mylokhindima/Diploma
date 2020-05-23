import { UsersService } from './users.service';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './../../schemas/user.schema';
import { UsersStore } from './users.store';
import { AuthModule } from '../+auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersStore, UsersService],
  exports: [UsersStore],
})
export class UsersModule {}