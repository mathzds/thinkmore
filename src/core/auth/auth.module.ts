import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './auth.stategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    EmailModule,
    PassportModule,
    JwtModule.register({
      secret: "kamina", // TODO implement env variables
      signOptions: { expiresIn: '5h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
