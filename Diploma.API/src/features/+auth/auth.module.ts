import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../+users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({ 
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30 days' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }