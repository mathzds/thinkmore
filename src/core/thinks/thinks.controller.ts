import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ThinksService } from './thinks.service';
import { UpdateThinkDto } from './dto/update-think.dto';
import { ThinkEntity } from 'src/common/entities/thinks.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ThinksDto } from './dto/think';

@UseGuards(JwtAuthGuard)
@Controller('thinks')
export class ThinksController {
  constructor(private readonly thinksService: ThinksService) { }

  @Post()
  async create(@Request() req, @Body() createThinkDto: ThinksDto): Promise<ThinkEntity> {
    return await this.thinksService.createThink(createThinkDto, req.user);
  }

  @Get()
  async findAll(): Promise<ThinkEntity[]> {
    return await this.thinksService.findAllThink();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ThinkEntity> {
    return await this.thinksService.findOneThink(id);
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: number, @Body() updateThinkDto: UpdateThinkDto): Promise<ThinkEntity | string> {
    const owner = req.user.id;
    return await this.thinksService.updateThink(owner, id, updateThinkDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number): Promise<{ message: string }> {
    const owner = req.user.id;
    await this.thinksService.removeThink(owner, id);
    return { message: 'Think successfully deleted' };
  }
}
