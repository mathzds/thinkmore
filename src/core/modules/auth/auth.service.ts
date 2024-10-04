import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async singIn(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOne({ email });
        if (email !== user.email || password !== user.password) {
            throw new Error('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const access_token = await this.jwtService.sign(payload);
        return { access_token };
    }

    async getProfileInfo(email: string) {
        const user = await this.userService.findOne({ email });
        return user;
    }
}
