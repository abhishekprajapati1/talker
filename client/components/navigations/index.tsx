import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Logo from '../icons/Logo'
import ContactsIcon from '../icons/ContactsIcon'

const Navbar = () => {
    return (
        <AppBar position='sticky' sx={{ boxShadow: 'none', top: 0 }}>
            <Toolbar sx={{ height: 70 }}>
                <Stack direction="row" alignItems="center">
                    <IconButton size="large" component={Link} href="/">
                        <Logo className="text-white w-[50px] h-[40px]" />
                    </IconButton>
                    <Typography variant='h5'>Talker</Typography>
                </Stack>
                <Stack direction="row" flexGrow={1} justifyContent="end">
                    <IconButton component={Link} href="/contacts">
                        <ContactsIcon className="text-white w-[30px] h-[30px]" />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar