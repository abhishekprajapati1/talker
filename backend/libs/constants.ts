export const TOKENS = {
    auth_token: "_ta",
    refresh_auth_token: "_tra",
}

export type REFRESH_TOKEN_TYPES = "_ta";

export const TOKEN_EXPIRATIONS = {
    [TOKENS.auth_token]: "30m",
    [TOKENS.refresh_auth_token]: "12h"
}

export const MAX_AGES = {
    [TOKENS.auth_token]: 1000 * 60 * 30,
    [TOKENS.refresh_auth_token]: 1000 * 60 * 60 * 12
}

export type TOKEN_DATA = {
    value?: string;
    life?: number;
    type?: REFRESH_TOKEN_TYPES;
}