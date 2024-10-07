import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThinksService } from './thinks.service';
import { UpdateThinkDto } from './dto/update-think.dto';
import { ThinksDto } from './dto/think';

@Controller('thinks')
export class ThinksController {
  constructor(private readonly thinksService: ThinksService) { }

  @Post()
  create(@Body() createThinkDto: ThinksDto) {
    return this.thinksService.create(createThinkDto);
  }

  @Get()
  findAll() {
    return this.thinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThinkDto: UpdateThinkDto) {
    return this.thinksService.update(+id, updateThinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thinksService.remove(+id);
  }
}
