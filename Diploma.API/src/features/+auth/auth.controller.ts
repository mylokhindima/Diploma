import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDTO, @Request() req) {
      return this.authService.login(req.user);
    }
}