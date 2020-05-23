import { UsersService } from './users.service';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { UserEntity } from './user.entity';
import { Controller, Get, Request, Param, Headers, UseGuards, ClassSerializerInterceptor, UseInterceptors, Put } from '@nestjs/common';
import { UsersStore } from './users.store';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _usersStore: UsersStore
  ) { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getMe(@Headers('authorization') token: string): Promise<UserEntity> {
    token = token.split('Bearer ')[1];
    
    return await this._usersService.findMe(token);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(): Promise<UserEntity[]> {
    return await this._usersStore.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async get(@Param('id') id: string): Promise<UserEntity> {
    return await this._usersStore.find(id);
  }

  
  @Put('/deactivate/:id')
  @UseGuards(JwtAuthGuard)
  public async deactivate(@Param('id') id: string): Promise<void> {
    return await this._usersStore.deactivate(id);
  }
}
