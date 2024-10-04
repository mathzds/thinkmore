import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, InternalServerErrorException, Head } from '@nestjs/common';
import { ThinkService } from './think.service';
import { CreateThinkDto } from './dto/create-think.dto';
import { UpdateThinkDto } from './dto/update-think.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@UseGuards(AuthGuard)
@Controller('think')
export class ThinkController {
  constructor(
    private readonly thinkService: ThinkService,
  ) { }

  @Post()
  async create(@Body() createThinkDto: CreateThinkDto, @Request() req) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const userId = await this.thinkService.decodeToken(token);
      const think = await this.thinkService.create(createThinkDto, userId);
      return think;
    } catch (error) {
      return error
    }
  }

  @Get()
  async findAll() {
    return this.thinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.thinkService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateThinkDto: UpdateThinkDto) {
    return this.thinkService.update(+id, updateThinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.thinkService.remove(+id);
  }
}
