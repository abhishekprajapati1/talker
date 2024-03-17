import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'
import ContactsIcon from '../icons/ContactsIcon'
import AngleIcon from '../icons/AngleIcon'
import { IWrapper } from '@/libs/types'

interface TopBarProps extends IWrapper {
    title?: string;
    backURL?: string;
    isLoading?: boolean;
}

const Topbar: FC<TopBarProps> = ({ children, title, backURL = "/", isLoading }) => {


    if (isLoading) {
        return (
            <AppBar position='sticky' sx={{ boxShadow: 'none', top: 0 }}>
                <Toolbar sx={{ height: 70 }} className='flex items-center' >
                    <Stack direction="row" {...(title && { flexGrow: 1 })} gap={2} alignItems="center">
                        <Box className="animate-pulse bg-white/50 w-[22px] h-[22px] rounded-md" />
                        {title && <Box className="animate-pulse bg-white/50 w-[150px] h-[22px] rounded-md" />}
                    </Stack>
                    {
                        children && (
                            <Stack direction="row" {...(!title && { flexGrow: 1 })} alignItems="center" gap={2}>
                                {children}
                            </Stack>
                        )
                    }
                </Toolbar>
            </AppBar>
        )
    }


    return (
        <AppBar position='sticky' sx={{ boxShadow: 'none', top: 0 }}>
            <Toolbar sx={{ height: 70 }} >
                <Stack direction="row" {...(title && { flexGrow: 1 })} alignItems="center">
                    <IconButton size="large" component={Link} href={backURL}>
                        <AngleIcon className="text-white w-[22px] h-[22px]" />
                    </IconButton>
                    {title && <Typography variant='h6'>{title}</Typography>}
                </Stack>
                {
                    children && (
                        <Stack direction="row" {...(!title && { flexGrow: 1 })} alignItems="center" gap={2}>
                            {children}
                        </Stack>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Topbar