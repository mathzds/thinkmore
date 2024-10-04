import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      return { message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const userId = await this.userService.decodeToken(token);
      return await this.userService.update(userId, updateUserDto);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      return { message: error.message };
    }
  }

}
