import { Injectable } from '@nestjs/common';
import { ThinksDto } from './dto/think';
import { UpdateThinkDto } from './dto/update-think.dto';

@Injectable()
export class ThinksService {
  create(createThinkDto: ThinksDto) {
    return 'This action adds a new think';
  }

  findAll() {
    return `This action returns all thinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} think`;
  }

  update(id: number, updateThinkDto: UpdateThinkDto) {
    return `This action updates a #${id} think`;
  }

  remove(id: number) {
    return `This action removes a #${id} think`;
  }
}
