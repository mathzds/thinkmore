import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import UserInterface from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
    private readonly users = new Map<string, UserInterface>();

    constructor(
        private jwtService: JwtService
    ) { }

    async magicLink(email: string) {
        const token = randomUUID();
        const user: UserInterface = { email, id: this.users.size + 1 };
        this.users.set(token, user)

        const refLink = `http://localhost:3000/auth/verify/${token}`;
        await this.sendMagicLink(email, refLink);
        return { message: "Magiclink sent" };
    }

    async validateToken(token: string) {
        const user = this.users.get(token);

        if (user) {
            this.users.delete(token);
            const jwtToken = this.jwtService.sign({ email: user.email, id: user.id });
            return { message: "Email verified", email: user.email, token: jwtToken };
        }

        return { message: "Invalid token" };
    }

    private async sendMagicLink(email: string, link: string) {
        // TODO implement smtp viewer
        return console.log(email, link)
    }
}
