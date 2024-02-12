import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'
import ContactsIcon from '../icons/ContactsIcon'
import AngleIcon from '../icons/AngleIcon'

interface TopBarProps {
    title?: string;
    onBack?: () => void;
}

const Topbar: FC<TopBarProps> = ({ title, onBack }) => {
    return (
        <AppBar position='sticky' sx={{ boxShadow: 'none', top: 0 }}>
            <Toolbar sx={{ height: 70 }} >
                <Stack direction="row" flexGrow={1} alignItems="center">
                    <IconButton size="large" component={Link} href="/">
                        <AngleIcon className="text-white w-[22px] h-[22px]" />
                    </IconButton>
                    <Typography variant='h6'>{title}</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar