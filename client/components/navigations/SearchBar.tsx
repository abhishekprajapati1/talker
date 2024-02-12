import { AppBar, Box, IconButton, Input, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'
import AngleIcon from '../icons/AngleIcon'

interface TopBarProps {
    title?: string;
    onBack?: () => void;
}

const SearchBar: FC<TopBarProps> = ({ title, onBack }) => {
    return (
        <AppBar position='sticky' color="transparent" sx={{ boxShadow: 0 }} className='top-0 border border-bottom'>
            <Toolbar sx={{ height: 70 }} >
                <Stack direction="row" flexGrow={1} alignItems="center">
                    <IconButton size="large" component={Link} href="/">
                        <AngleIcon className="w-[22px] h-[22px]" />
                    </IconButton>
                    <Box component="input" placeholder='Enter name or email...' className='border-none outline-none' type="text" />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default SearchBar