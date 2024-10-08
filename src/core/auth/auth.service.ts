import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import UserInterface from 'src/common/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
    private readonly users = new Map<string, UserInterface>();

    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
        private readonly emailService: EmailService
    ) { }

    async magicLink(email: string) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const token = randomUUID();
        this.users.set(token, user);

        const refLink = `http://localhost:5173/verify/${token}`;
        // const refLink2 = `http://localhost:3000/auth/verify/${token}`;
        // await this.sendMagicLink(email, refLink2);
        await this.sendMagicLink(email, refLink);
        return { message: "Magic link sent", data: { email: email } };
    }

    async validateToken(token: string, res: Response) {
        const user = this.users.get(token);

        if (!user) {
            return { message: "Invalid token" };
        }

        this.users.delete(token);
        const jwtToken = this.jwtService.sign({ email: user.email, id: user.id });
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 86400000,
        });

        return { message: "Email verified", email: user.email, id: user.id };
    }

    private async sendMagicLink(email: string, link: string) {
        return await this.emailService.sendEmail({ email: email, link: link });
    }
}
