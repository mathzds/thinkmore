import { Module } from '@nestjs/common';
import { ThinkService } from './think.service';
import { ThinkController } from './think.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ThinkController],
  providers: [ThinkService],
})
export class ThinkModule { }
