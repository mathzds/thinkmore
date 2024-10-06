import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() data: UserDto) {
    return this.userService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() data: UpdateUserDto, @Request() req) {
    const userEmail = req.user.email;
    const user = await this.userService.findUserByEmail(userEmail);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userService.updateUser(user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req) {
    const userEmail = req.user.email;
    const user = await this.userService.findUserByEmail(userEmail);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userService.deleteUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }
}
