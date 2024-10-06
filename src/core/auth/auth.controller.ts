import { Controller, Post, Body, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  async sendMagicLink(@Body('email') email: string) {
    return this.authService.magicLink(email);
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return await this.userService.findOneById(userId);
  }
}
