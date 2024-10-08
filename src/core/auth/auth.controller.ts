import { Controller, Post, Body, Get, Param, Request, UseGuards, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { Response } from 'express';

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
  async verify(@Param('token') token: string, @Res() response: Response) {
    const result = await this.authService.validateToken(token, response);
    return response.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const userEmail = req.user.email;
    return await this.userService.findOneByEmail(userEmail);
  }
}
