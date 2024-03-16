import { Request } from "express";

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


export interface IMessage {
    reciever_id: string;
    body: {
        text?: string;
    }
}