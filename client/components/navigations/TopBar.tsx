import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'
import ContactsIcon from '../icons/ContactsIcon'
import AngleIcon from '../icons/AngleIcon'
import { IWrapper } from '@/libs/types'

interface TopBarProps extends IWrapper {
    title?: string;
    backURL?: string;
}

const Topbar: FC<TopBarProps> = ({ children, title, backURL = "/" }) => {
    return (
        <AppBar position='sticky' sx={{ boxShadow: 'none', top: 0 }}>
            <Toolbar sx={{ height: 70 }} >
                <Stack direction="row" flexGrow={1} alignItems="center">
                    <IconButton size="large" component={Link} href={backURL}>
                        <AngleIcon className="text-white w-[22px] h-[22px]" />
                    </IconButton>
                    <Typography variant='h6'>{title}</Typography>
                </Stack>
                {
                    children && (
                        <Stack direction="row" alignItems="center" gap={2}>
                            {children}
                        </Stack>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Topbar