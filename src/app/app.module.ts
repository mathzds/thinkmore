import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UserModule } from 'src/core/modules/user/user.module';
import { ThinkModule } from 'src/core/modules/think/think.module';
import { AuthModule } from 'src/core/modules/auth/auth.module';

@Module({
  imports: [UserModule, ThinkModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
