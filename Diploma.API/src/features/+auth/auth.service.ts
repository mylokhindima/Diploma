import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserEntity } from '../+users/user.entity';
import { UsersStore } from '../+users/users.store';
import { DecodedTokenInfo } from './models/decoded-token-info';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersStore,
        private jwtService: JwtService
    ) { }

    public async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && user.isActive && this.passwordsAreEqual(user.hash, user.salt, pass)) {
          return user;
        }

        return null;
      }
    
    async login(user: UserEntity) {
        const payload = { username: user.email, sub: user.id };

        return {
          access_token: this.jwtService.sign(payload)
        };
    }

    public decodeToken(token: string): DecodedTokenInfo {
      return this.jwtService.decode(token) as DecodedTokenInfo;
    }

    private passwordsAreEqual(
        userHash: string,
        userSalt: string,
        plainPassword: string
      ): boolean {
        const hash = crypto.pbkdf2Sync(plainPassword, userSalt, 10000, 512, 'sha512').toString('hex');

        return userHash === hash;
    }
}