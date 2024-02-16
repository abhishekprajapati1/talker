import axios, { AxiosError } from "axios";
import endpoints from "./endpoints";
import { TOKEN_VALIDITY } from "./constants";

export const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000/api/' : 'https://productionurl.com/api/';

const api = axios.create({
    withCredentials: true,
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export type RequestError = AxiosError & {
    response: {
        data: {
            success: boolean,
            message?: string,
            error?: any;
        }
    }
}

export const logout = async () => {
    try {
        const response = await api.post(endpoints.LOGOUT);
        alert(response?.data?.message);
        window.localStorage.clear();
        location.href = "/login"
    } catch (err: any) {
        showErrorMessage({ error: err });
    }
}

interface IShowErrorMessage {
    error: RequestError,
    redirect?: {
        path?: string;
        shouldRedirect?: boolean;
    }
}

export const showErrorMessage = (data: IShowErrorMessage) => {

    const { error, redirect } = data || {};
    const { shouldRedirect = true, path = "/login" } = redirect || {};

    let message;
    if (Array.isArray(error?.response?.data?.message) && error?.response?.data?.message.length > 0) {
        message = error?.response?.data?.message[0];
    } else {
        message = error?.response?.data?.message || data?.error?.message || "Something went wrong";
    }
    alert(message);

    if (error.response.status === 401 && shouldRedirect) {
        window.location.href = path;
    }
}



export type TOKEN_TO_REFRESH = {
    type: string;
    life: number;
}



export const refreshToken = async (token: TOKEN_TO_REFRESH, keyname: string = TOKEN_VALIDITY.auth_token) => {
    try {
        const response = await api.get(`${endpoints.REFRESH_TOKEN}?type=${token.type}`);
        const newToken: TOKEN_TO_REFRESH = response.data?.data?.token;
        if (newToken) {
            window?.localStorage?.setItem(keyname, JSON.stringify({ type: newToken.type, life: newToken.life }));
        }
    } catch (error: any) {
        showErrorMessage({ error });
    }
}

export const getUserDetails = async (token: string) => {
    try {
        const response = await api.get(endpoints.USER_DETAILS, { headers: { Authorization: token } });
        return response?.data?.data;
    } catch (error) {
        return null;
    }
}

export default api;