import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UserModule } from 'src/core/modules/user/user.module';
import { ThinkModule } from 'src/core/modules/think/think.module';
import { AuthModule } from 'src/core/modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UserModule, ThinkModule, AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 2000,
      limit: 1,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule { }
