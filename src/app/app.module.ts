import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from 'src/core/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/core/auth/auth.module';
import { EmailModule } from 'src/core/email/email.module';
import { ThinksModule } from 'src/core/thinks/thinks.module';

@Module({
  imports: [UserModule, EmailModule, ThinksModule, AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 200,
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
