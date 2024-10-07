import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    async sendEmail(data: { email: string, link: string }) {
        return console.log(data)
    }
}
