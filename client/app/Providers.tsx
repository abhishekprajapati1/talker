'use client';
import { IWrapper } from '@/libs/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, useEffect, useState } from 'react'
import { TOKEN_VALIDITY } from '@/libs/constants';
import { TOKEN_TO_REFRESH, refreshToken } from '@/libs/api';

const Providers: FC<IWrapper> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 19 * (60 * 1000),
                gcTime: 20 * (60 * 1000),
            },
        }
    }));

    const refreshAuthToken = () => {
        const tokenMeta = window.localStorage.getItem(TOKEN_VALIDITY.auth_token);
        const token: TOKEN_TO_REFRESH = tokenMeta ? JSON.parse(tokenMeta) : null;

        if (token) {
            const timeToRefresh = token.life - Date.now();
            if (timeToRefresh <= 60000 && timeToRefresh > 0) {
                refreshToken(token, TOKEN_VALIDITY.auth_token);
            }
        }
    }


    useEffect(() => {
        const id = setInterval(refreshAuthToken, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}

export default Providers;