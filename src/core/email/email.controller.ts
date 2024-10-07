import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  // todo implement email service
  sendEmail(data: { email: string, link: string }) {
    return this.emailService.sendEmail(data)
  }
}
