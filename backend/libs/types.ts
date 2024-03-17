import { Request } from "express";
import { Socket } from "socket.io";

export type UserPayload = {
    id: string;
    iat?: number;
    exp?: number;
    type?: string;
}

export interface IUserPayload {
    user: UserPayload
}

export interface TokenPayload {
    token_payload: any;
}

export interface RefreshToken {
    refresh: string;
}

export interface RequestWithAll extends Request, IUserPayload, RefreshToken, TokenPayload { }

export interface HydratedSocket extends Socket {
    user: {
        id: string;
        iat: number;
        exp: number;
    }
}