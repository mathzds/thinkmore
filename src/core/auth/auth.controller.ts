import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async sendMagicLink(@Body('email') email: string) {
    return this.authService.magicLink(email);
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }
}
