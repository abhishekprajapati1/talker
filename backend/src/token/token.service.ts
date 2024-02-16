import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { MAX_AGES, TOKENS, TOKEN_EXPIRATIONS } from 'libs/constants';
import { Response } from 'express';

@Injectable()
export class TokenService {
    constructor() {

    }

    generateToken(payload: any, options?: jwt.SignOptions) {
        return jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: TOKEN_EXPIRATIONS[TOKENS.auth_token], ...(options && options) });
    }

    verifyToken(token: string): any {
        try {
            const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
            return decoded;
        } catch (error) {
            return null;
        }
    }

    setCookie(response: Response, { data, age, name }: { data: any, age?: number, name: string }): void {
        response.cookie(name, data, {
            maxAge: age || MAX_AGES[TOKENS.auth_token],
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
    }

    removeCookie(response: Response, name: string): void {
        response.clearCookie(name)
    }

    verifyRefreshToken(refresh_token: string, id: string) {
        const refresh_payload = this.verifyToken(refresh_token);
        if (!refresh_payload) throw new BadRequestException({ success: false, message: "Refresh token was not found" })
        if (refresh_payload.type !== TOKENS.refresh_auth_token) throw new BadRequestException({ success: false, message: "Refresh token is not valid" })
        if (refresh_payload.data.id !== id) throw new BadRequestException({ success: false, message: "Refresh token is not valid" });
        return refresh_payload;
    }
}
