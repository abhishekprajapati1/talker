import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { TokenService } from "../token/token.service";
import { TOKENS } from "libs/constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException({ success: false, message: "Access denied !!" });
        }

        try {
            const payload = this.tokenService.verifyToken(token);
            if (!payload) throw new BadRequestException({ success: false, message: "Access denied !!" });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException({ success: false, message: "Access denied !!" });
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.cookies[TOKENS.auth_token] || request.headers['authorization'];
        return token;
    }
}