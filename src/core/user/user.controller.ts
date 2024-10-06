import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() data: UserDto) {
    return await this.userService.createUser(data)
  }

  @Patch()
  async update(@Param('id') id: number, @Body() data: UserDto) {
    return await this.userService.updateUser(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOneById(id)
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findOneByEmail(email)
  }

  @Get()
  async findAll() {
    return await this.userService.findAll()
  }
}
