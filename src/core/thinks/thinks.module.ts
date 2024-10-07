import { Module } from '@nestjs/common';
import { ThinksService } from './thinks.service';
import { ThinksController } from './thinks.controller';

@Module({
  controllers: [ThinksController],
  providers: [ThinksService],
})
export class ThinksModule {}
