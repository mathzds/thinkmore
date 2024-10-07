import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
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
    const user = await this.userService.findUserByEmail(req.user.email);
    return this.userService.updateUser(user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req) {
    const user = await this.userService.findUserByEmail(req.user.email);
    return this.userService.deleteUser(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }
}
