import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
    private readonly users = new Map<string, string>();

    constructor(
        private jwtService: JwtService
    ) { }

    async magicLink(email: string) {
        const token = randomUUID();
        this.users.set(token, email);

        const link = `http://localhost:3000/auth/verify/${token}`;
        await this.sendMagicLink(email, link);

        return { message: 'Magic link sent to your email!' };
    }

    async validateToken(token: string) {
        const email = this.users.get(token);
        if (email) {
            this.users.delete(token);
            const jwtToken = this.jwtService.sign({ email });
            return { message: "Email verified", email: { email }, token: { jwtToken } };
        }

        return { message: "Invalid token" };
    }

    private async sendMagicLink(email: string, link: string) {
        // TODO implement smtp viewer
        return console.log(email, link)
    }
}
