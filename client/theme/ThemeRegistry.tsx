'use client';
import { IWrapper } from '@/libs/types';
import React, { FC } from 'react'
import { ThemeProvider } from '@mui/material';
import theme from '.'

const ThemeRegistry: FC<IWrapper> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeRegistry